#!/usr/bin/env node

const Core = require('./index.js')
const minimist = require("minimist")
const colors = require("colors")
const pkg = require('../package.json')

const argv = minimist(process.argv.slice(2))

const start = async () => {
  const docgen = new Core(argv.schema, argv.output, argv.config)
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
  _____             ____                            _
 |     |___ ___ ___|    \\ ___ ___ _ _ _____ ___ ___| |_ ___ ___
 |  |  | . | -_|   |  |  | . |  _| | |     | -_|   |  _| -_|  _|
 |_____|  _|___|_|_|____/|___|___|___|_|_|_|___|_|_|_| |___|_|
       |_|                                             ${pkg.version}
`.green)

if(!argv.schema || !argv.output) {
  console.log(`
  OpenDocumenter is a automatic documentation generator for OpenAPI v3 schemas.
  Simply provide your schema file in JSON or YAML, then sit back and enjoy the documentation.

  Powered by nuxt.js and swagger-parser.

  Usage:

      opendocumenter --schema=<file> --output=<dir>

  Arguments:

      --schema=<file>    The OpenAPI v3 format file to generate documentation from
      --output=<dir>     The output destination directory
      --config=<file>    A configuration file to load advanced options from.`)
} else {
  start()
}
