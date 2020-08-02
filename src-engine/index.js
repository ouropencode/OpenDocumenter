const SwaggerParser = require("@apidevtools/swagger-parser")
const copy = require("recursive-copy")
const path = require("path")
const fs = require("fs")
const uuid = require("uuid")
const colors = require("colors")
const execShPromise = require("exec-sh").promise;

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
      "vueModernMode": true,
      "vueReport": "none",
      "shields": [],
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
      "EXTERNAL_DOCUMENTATION": "External Documentation",
      "DOCUMENTATION": "Documentation",
      ...config.i18n
    }

    if(this._config.mergeFromDirectory != null)
      this._mrgPath = path.resolve(this._config.mergeFromDirectory)

    this._srcPath = path.join(__dirname, '..', 'src')
    this._tmpPath = path.join(__dirname, '..', 'tmp', uuid.v4(), 'src')
    this._cwd = process.cwd()
  }

  async prepare() {
    this._api = await this.loadAPI(this._schema)

    this._displayInfo()

    await copy(this._srcPath, this._tmpPath, { dot: true })

    await copy(
      path.join(this._srcPath, "vue.config.js"),
      path.join(this._tmpPath, "..", "vue.config.js")
    )

    await copy(
      "package.json",
      path.join(this._tmpPath, "..", "package.json")
    )

    if(this._config.mergeFromDirectory != null)
      await copy(this._mrgPath, this._tmpPath, { overwrite: true, dot: true })

    fs.writeFileSync(path.join(this._tmpPath, "environment.json"), JSON.stringify({
      ...this._config,
      api: this._api,
    }))
  }

  async finish() {
    fs.rmdirSync(this._outputDir, { recursive: true });

    const results = await copy(path.join(this._tmpPath, "..", "dist"), this._outputDir)

    this._displayBanner(`OpenDocumenter finished! ${results.length} files created.`)
  }

  async finalize() {
    process.chdir(this._cwd)
    fs.rmdirSync(this._tmpPath, { recursive: true })
  }

  async generate(file) {
    process.chdir(path.resolve(this._tmpPath, '..'))

    let flags = []

    if(this._config.vueModernMode == true)
      flags.push("--modern")

    if(this._config.vueReport == "html" || this._config.vueReport == "both")
      flags.push("--report")

    if(this._config.vueReport == "json" || this._config.vueReport == "both")
      flags.push("--report-json")

    flags = flags.join(' ')

    let flagStr = flags.length > 0 ? `with flags: ${flags}` : ''
    this._displayBanner(`Starting build ${flagStr}`)
    await execShPromise(`vue-cli-service build ${flags}`)
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

    return api
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
