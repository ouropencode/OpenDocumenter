const { Nuxt, loadNuxtConfig, Builder, BundleBuilder, Generator } = require("nuxt")
const SwaggerParser = require("@apidevtools/swagger-parser")
const copy = require("recursive-copy")
const path = require("path")
const fs = require("fs")
const uuid = require("uuid")
const colors = require("colors")

module.exports = class Core {

  constructor(file, outputDir) {
    this._file = path.resolve(file)
    this._outputDir = path.resolve(outputDir)
    this._srcPath = path.join(__dirname, 'src')
    this._tmpPath = path.join(__dirname, uuid.v4())
    this._cwd = process.cwd()
  }

  async prepare() {
    this._api = await this.loadAPI(this._file)
    console.log(`  API Name:      ${this._api.info.title}`)
    console.log(`  API Version:   ${this._api.info.version}`)
    console.log(`  Schema:        ${this._file}`)
    console.log(`  Output Dir:    ${this._outputDir}`)

    await copy(this._srcPath, this._tmpPath)
  }

  async finish() {
    fs.rmdirSync(this._outputDir, { recursive: true });

    const results = await copy(path.join(this._tmpPath, "dist"), this._outputDir)

    console.log()
    console.log(`  --- OpenDocumenter finished. ${results.length} files created. ---`.bold.green)
    console.log()
  }

  async finalize() {
    process.chdir(this._cwd)
    fs.rmdirSync(this._tmpPath, { recursive: true });
  }

  async generate(file) {
    process.chdir(this._tmpPath)

    const i18n = {
      'API_SDK_DOCUMENTATION': 'API and SDK Documentation',
      'VERSION': 'Version',
      'NO_INDEPTH_DOCS_AVAILABLE_ENDPOINT': 'No in-depth API documentation is available for this endpoint.',
      'NO_INDEPTH_DOCS_AVAILABLE_TAG': 'No in-depth API documentation is available for this section.',
      'CLICK_TO_COPY': 'click to copy',
      'COPIED': 'copied',
      'REQUEST_BODY': 'Request Body',
      'REQUEST_RESPONSES': 'Request Responses',
      'DEFINITION': 'Definition',
      'DEFINITIONS': 'Definitions',
      'SERVER': 'Server',
      'LANGUAGE': 'Language',
      'GENERATED_USING': 'Generated using OpenDocumenter by OurOpenCode',
    };

    const config = await this.getNuxtConfig({ dev: false })
    config.env = {
      api: this._api,
      i18n,
      ...config.env
    }
    config.build = config.build || {}
    config.build.analyze = false
    config.target = 'static'

    console.log()
    console.log("  --- Starting nuxt for build ---".bold.green)
    console.log()

    try {
      const nuxt = await this.getNuxt(config)
      const generator = await this.getGenerator(nuxt)
      await nuxt.server.listen(0)
      const { errors } = await generator.generate({
        init: true,
        build: true
      })
      await nuxt.close()
    } catch (e) {
      console.error(e)
      await nuxt.close()
    }
  }

  async loadAPI(file) {
    try {
      let api = await SwaggerParser.validate(file)
      api = await SwaggerParser.bundle(api)
      return api
    }
    catch(err) {
      console.error(err)
    }
  }

  async getNuxt(options) {
    const nuxt = new Nuxt(options)
    await nuxt.ready()
    return nuxt
  }

  async getNuxtConfig(extraOptions = {}) {
    const config = await loadNuxtConfig()
    const options = Object.assign(config, extraOptions)
    return options
  }

  async getBuilder(nuxt) {
    return new Builder(nuxt, BundleBuilder)
  }

  async getGenerator(nuxt) {
    const builder = await this.getBuilder(nuxt)
    return new Generator(nuxt, builder)
  }
}
