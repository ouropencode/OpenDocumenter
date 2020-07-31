const { Nuxt, loadNuxtConfig, Builder, BundleBuilder, Generator } = require("nuxt")
const SwaggerParser = require("@apidevtools/swagger-parser")

module.exports = class Core {

  async generate(file, options = {}) {
    const api = await this.loadAPI(file);
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
      'GENERATED_USING': 'Generated using OpenAPI Documenter by OurOpenCode',
    };

    console.log("API name: %s, Version: %s", api.info.title, api.info.version)

    const config = await this.getNuxtConfig({ dev: false })
    config.env = { api, i18n, ...config.env }
    config.build = config.build || {}
    config.build.analyze = false
    config.target = 'static'

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
    process.exit()
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
