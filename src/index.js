const { Nuxt, loadNuxtConfig, Builder, BundleBuilder, Generator } = require("nuxt")
const SwaggerParser = require("@apidevtools/swagger-parser")
const copy = require("recursive-copy")
const path = require("path")
const fs = require("fs")
const uuid = require("uuid")
const colors = require("colors")

module.exports = class Core {

  constructor(schema, outputDir, configFile) {
    this._schema = path.resolve(schema)
    this._outputDir = path.resolve(outputDir)
    this._configFile = configFile ? path.resolve(configFile) : undefined

    let config = {}
    if(this._configFile)
      config = JSON.parse(fs.readFileSync(this._configFile))

    this._config = {
      "mergeFromDirectory": null,
      "disableGeneratedUsingFooter": false,
      "abortOnInvalidSchema": false,
      "i18n": {},
      ...config
    }

    this._config.i18n = {
      "API_SDK_DOCUMENTATION": "API and SDK Documentation",
      "VERSION": "version",
      "NO_INDEPTH_DOCS_AVAILABLE_ENDPOINT": "No in-depth API documentation is available for this endpoint.",
      "NO_INDEPTH_DOCS_AVAILABLE_TAG": "No in-depth API documentation is available for this section.",
      "CLICK_TO_COPY": "click to copy",
      "COPIED": "copied",
      "REQUEST_BODY": "Request Body",
      "REQUEST_RESPONSES": "Request Responses",
      "DEFINITION": "Definition",
      "DEFINITIONS": "Definitions",
      "SERVER": "Server",
      "LANGUAGE": "Language",
      "GENERATED_USING": "Generated using OpenDocumenter by $ourOpenCode",
      "HAVE_ANY_QUESTIONS_CONTACT": "Have any questions? Please contact",
      "US": "us",
      "OR": "or",
      "VIA_EMAIL": "via email",
      "VIA_OUR_WEBSITE": "via our website",
      ...config.i18n
    }

    if(this._config.mergeFromDirectory != null)
      this._mrgPath = path.resolve(this._config.mergeFromDirectory)

    this._srcPath = path.join(__dirname, '..', 'src-nuxt')
    this._tmpPath = path.join(__dirname, '..', 'tmp', uuid.v4())
    this._cwd = process.cwd()
  }

  async prepare() {
    this._api = await this.loadAPI(this._schema)

    this._displayInfo()

    await copy(this._srcPath, this._tmpPath)

    if(this._config.mergeFromDirectory != null)
      await copy(this._mrgPath, this._tmpPath, { overwrite: true })
  }

  async finish() {
    fs.rmdirSync(this._outputDir, { recursive: true });

    const results = await copy(path.join(this._tmpPath, "dist"), this._outputDir)

    this._displayBanner(`OpenDocumenter finished! ${results.length} files created.`)
  }

  async finalize() {
    process.chdir(this._cwd)
    fs.rmdirSync(this._tmpPath, { recursive: true });
  }

  async generate(file) {
    process.chdir(this._tmpPath)

    const config = await this.getNuxtConfig({ dev: false })
    config.env = {
      ...config.env,
      config: this._config,
      api:    this._api,
    }
    config.build = config.build || {}
    config.build.analyze = false
    config.target = 'static'

    this._displayBanner("Starting nuxt for build")

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
      await nuxt.close()
      throw e
    }
  }

  async loadAPI(file) {
    let api = await SwaggerParser.parse(file)

    try {
      api = await SwaggerParser.validate(file)
    } catch(e) {
      if(e.name != "SyntaxError") throw e
      this._displaySchemaSyntaxError(e.details)
      if(this._config.abortOnInvalidSchema == true)
        throw e
    }

    api = await SwaggerParser.bundle(api)
    return api
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

  async _displayBanner(text, type = "default") {
    let prefix = "---";
    let color = "green"

    if(type == "warn" || type == "warning") {
      prefix = "???"
      color = "yellow"
    }

    if(type == "err" || type == "error") {
      prefix = "!!!"
      color = "red"
    }

    console.log()
    console.log(` ${prefix} ${text}`.bold[color])
    console.log()
  }

  async _displayInfo() {
    this._displayBanner("API Details")
    console.log(`  Name:      ${this._api.info.title}`)
    console.log(`  Version:   ${this._api.info.version}`)
    console.log(`  Schema:    ${this._schema}`)
    console.log(`  Output:    ${this._outputDir}`)
    if(this._configFile)
      console.log(`  Config:    ${this._configFile}`)
  }

  async _displaySchemaSyntaxError(details) {
    this._displayBanner("OpenAPI schema validation failed", "warn")
    details.forEach((issue, idx) => {
      console.log("    - #/" + issue.path.join('/'))
      console.log("      " + issue.message)
      if(idx != details.length - 1)
        console.log()
    })
  }
}
