#!/usr/bin/env node

const Core = require('./index.js')
const minimist = require("minimist")
const colors = require("colors")
const pkg = require('./package.json')

const argv = minimist(process.argv.slice(2))

const start = async () => {
  const docgen = new Core(argv.schema, argv.outputDir)
  try {
    await docgen.prepare()
    await docgen.generate()
    await docgen.finish()
  } catch(e) {
    console.error(e)
  }
  await docgen.finalize()
}

console.log(`
  _____             _____ _____ _____     ____                            _
 |     |___ ___ ___|  _  |  _  |     |___|    \\ ___ ___ _ _ _____ ___ ___| |_ ___ ___
 |  |  | . | -_|   |     |   __|-   -|___|  |  | . |  _| | |     | -_|   |  _| -_|  _|
 |_____|  _|___|_|_|__|__|__|  |_____|   |____/|___|___|___|_|_|_|___|_|_|_| |___|_|
       |_|                                                                       ${pkg.version}
`.green)

if(!argv.schema || !argv.outputDir) {
  console.log(`
  OpenAPI-Documenter is a automatic documentation generator. Simply provide an OpenAPI schema file in JSON or YAML
  alongside your output directory, then sit back and enjoy the documentation.

  Powered by nuxt.js and swagger-parser.

  Usage:

      openapi-documenter --schema=<file> --outputDir=<dir>

  Arguments:

      --schema=<file>    The OpenAPI 3 format file to generate documentation from
      --outputDir=<dir>  The output destination directory`)
} else {
  start()
}
