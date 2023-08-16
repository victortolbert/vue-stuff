// Run this to generate data.json
const fs = require('node:fs')
const _ = require('lodash')
const Factory = require('rosie').Factory
const { faker } = require('@faker-js/faker')

const db = {}
const { events } = require('.')
// Credit http://www.paulirish.com/2009/random-hex-color-code-snippets/
function hex() {
  return Math.floor(Math.random() * 16777215).toString(16)
}

// Tables
db.events = events
db.posts = []
db.comments = []
db.albums = []
db.photos = []
db.users = []
db.todos = []

// Factories
Factory.define('post')
  .sequence('id')
  .attr('title', () => { return faker.lorem.sentence() })
  .attr('body', () => { return faker.lorem.sentences(4) })

Factory.define('comment')
  .sequence('id')
  .attr('name', () => { return faker.lorem.sentence() })
  .attr('email', () => { return faker.internet.email() })
  .attr('body', () => { return faker.lorem.sentences(4) })

Factory.define('album')
  .sequence('id')
  .attr('title', () => { return faker.lorem.sentence() })

Factory.define('photo')
  .sequence('id')
  .attr('title', () => { return faker.lorem.sentence() })
  .option('color', hex())
  .attr('url', ['color'], (color) => {
    return `http://placehold.it/600/${color}`
  })
  .attr('thumbnailUrl', ['color'], (color) => {
    return `http://placehold.it/150/${color}`
  })

Factory.define('todo')
  .sequence('id')
  .attr('title', () => { return faker.lorem.sentence() })
  .attr('completed', () => { return !!_.random(1) })

Factory.define('user')
  .sequence('id')
  .after((user) => {
    const card = userCard()

    _.each(card, (value, key) => {
      user[key] = value
    })
  })

// Has many relationships
// Users
_(10).times(() => {
  const user = Factory.build('user')
  db.users.push(user)

  // Posts
  _(10).times(() => {
    // userId not set in create so that it appears as the last
    // attribute
    const post = Factory.build('post', { userId: user.id })
    db.posts.push(post)

    // Comments
    _(5).times(() => {
      const comment = Factory.build('comment', { postId: post.id })
      db.comments.push(comment)
    })
  })

  // Albums
  _(10).times(() => {
    const album = Factory.build('album', { userId: user.id })
    db.albums.push(album)

    // Photos
    _(50).times(() => {
      const photo = Factory.build('photo', { albumId: album.id })
      db.photos.push(photo)
    })
  })

  // Todos
  _(20).times(() => {
    const todo = Factory.build('todo', { userId: user.id })
    db.todos.push(todo)
  })
})

fs.writeFileSync('db.json', JSON.stringify(db, null, 2))

function userCard() {
  return {
    name: faker.name.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    address: {
      streetA: faker.address.street(),
      streetB: faker.address.streetAddress(),
      streetC: faker.address.streetAddress(),
      streetD: faker.address.secondaryAddress(),
      city: faker.address.city(),
      county: faker.address.county(),
      country: faker.address.country(),
      zipcode: faker.address.zipCode(),
    },
    phone: faker.phone.number(),
    website: faker.internet.domainName(),
    company: {
      name: faker.company.name(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.bs(),
    },
    posts: [
      {
        words: faker.lorem.words(),
        sentence: faker.lorem.sentence(),
        sentences: faker.lorem.sentences(),
        paragraph: faker.lorem.paragraph(),
      },
      {
        words: faker.lorem.words(),
        sentence: faker.lorem.sentence(),
        sentences: faker.lorem.sentences(),
        paragraph: faker.lorem.paragraph(),
      },
      {
        words: faker.lorem.words(),
        sentence: faker.lorem.sentence(),
        sentences: faker.lorem.sentences(),
        paragraph: faker.lorem.paragraph(),
      },
    ],
  }
}
