// const plants = require('../data/plants')

// const toxicPlants = plants.filter(plant => typeof plant.toxicity !== 'undefined')
// const nonToxicPlants = plants.filter(plant => typeof plant.toxicity === 'undefined')

const myArray = [
  { id: 0, name: 'Jhon' },
  { id: 1, name: 'Sara' },
  { id: 2, name: 'Domnic' },
  { id: 3, name: 'Bravo' },
]

// Find index of specific object using findIndex method.
const objIndex = myArray.findIndex(obj => obj.id === 1)

// Log object to Console.
console.log('Before update: ', myArray[objIndex])

// Update object's name property.
myArray[objIndex].name = 'Laila'

// Log object to console again.
console.log('After update: ', myArray[objIndex])

/* A pure function operating with primitives */
function filter(list, predicate) {
  return list.filter(predicate)
}

/* Function operating exactly on posts */
function getRecentPosts(posts) {
  return filter(posts, post => post.date === Date.now())
}
