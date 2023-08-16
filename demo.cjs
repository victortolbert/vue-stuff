const { dayparts, events, plants, people, serviceAreas, users } = require('./data/index.cjs')

function data() {
  return { dayparts, events, plants, people, serviceAreas, users }
}

module.exports = data
