#!/usr/bin/env node

const Core = require('./index.js')
const minimist = require("minimist")

const argError = err => {
  console.log(`ERR: ${err}`)
  process.exit(1)
}

const argv = minimist(process.argv.slice(2))
if(!argv.file)
  argError("Missing --file=<file> parameter")

const docgen = new Core()
docgen.generate(argv.file, {

})
