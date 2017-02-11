import test from 'ava'

import jsdomify from 'jsdomify'

let createSystemJS
test.before(() => {
  delete require.cache[require.resolve('systemjs')]
  jsdomify.create(`<!DOCTYPE html><html><base href="file://${process.cwd()}/index.html"></html>`)
  createSystemJS = require('./createSystemJS').createSystemJS
})

test.after(() => {
  jsdomify.destroy()
})

test(async _t => {
  const sys = createSystemJS('npm-module')
  console.log(sys.getConfig())
  await sys.import('npm-module')
})
