const fs = require('node:fs')

const data = require('./demo.cjs')

fs.writeFileSync('data.json', JSON.stringify(data(), null, 2))
