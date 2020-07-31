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
if(!argv.outputDir)
  argError("Missing --outputDir=<dir> parameter")

;(async () => {
  const docgen = new Core(argv.file, argv.outputDir)
  try {
    await docgen.prepare()
    await docgen.generate()
    await docgen.finish()
  } catch(e) {
    console.error(e)
  }
  await docgen.finalize()
})()
