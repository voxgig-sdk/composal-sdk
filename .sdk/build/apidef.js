
const { ApiDef } = require('@voxgig/apidef')

const opts = {
  folder: __dirname + '/../model',
  // The definition names no server; the API reference gives the hosted origin
  // (composal.com/docs/api.md), and every path keeps its /api/v1 prefix.
  server: 'https://api.composal.com',
}

module.exports = ApiDef.makeBuild(opts)
