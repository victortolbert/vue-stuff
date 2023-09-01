/**
 *
 *  ## JavaScript's Map GroupBy Object Keys & Null Coalescing
 *
 *  Keys of a map can be anything - including an object!
 *  Here I'm using the new groupBy proposed API to group array
 * items into a Map or an Object
 *
 **/

const utterances = [
  { text: 'Hello Welcome to the show', start: 0, end: 3 },
  { text: 'JavaScript popular for web dev', start: 4, end: 7 },
  { text: 'variables declared with var, let', start: 8, end: 11 },
  { text: 'Hello Welcome to the show', start: 12, end: 15 },
  { text: 'Hello Welcome to the show', start: 16, end: 19 },
  { text: 'Hello Welcome to the show', start: 20, end: 23 },
  { text: 'Hello Welcome to the show', start: 24, end: 27 },
  { text: 'Hello Welcome to the show', start: 28, end: 31 },
  { text: 'Hello Welcome to the show', start: 32, end: 35 },
  { text: 'Hello Welcome to the show', start: 36, end: 39 },
]

const topics = [
  { topic: 'Topic 1', start: 0 },
  { topic: 'Topic 2', start: 12 },
  { topic: 'Topic 3', start: 24 },
]

const groupTopics = Map.groupBy(utterances, utterance =>
  // Find the topic this on fits into
  topics.find((topic, i) => {
    const { start } = topic
    const end = topics.at(i + 1)?.start ?? Number.POSITIVE_INFINITY
    return utterance.start >= start && utterance.end <= end
  }),
)
