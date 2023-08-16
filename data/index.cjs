const defaultDate = new Date('2011-06-09T00:00:00.000Z')

const dayparts = require('./dayparts.cjs')
const events = require('./events.cjs')
const markets = require('./markets.cjs')
const people = require('./people.cjs')
const plants = require('./plants.cjs')
const serviceAreas = require('./serviceAreas.cjs')
const users = require('./users.cjs')

// https://ngneat.github.io/falso/docs/getting-started

module.exports = {
  defaultDate,
  dayparts,
  events,
  markets,
  people,
  plants,
  serviceAreas,
  users,
}
