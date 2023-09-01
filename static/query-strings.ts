// https://github.com/sindresorhus/query-string#readme

import queryString from 'query-string'

console.log(location.search)
// => '?foo=bar'

const parsed = queryString.parse(location.search)
console.log(parsed)
// => {foo: 'bar'}

console.log(location.hash)
// => '#token=bada55cafe'

const parsedHash = queryString.parse(location.hash)
console.log(parsedHash)
// => {token: 'bada55cafe'}

parsed.foo = 'unicorn'
parsed.ilike = 'pizza'

const stringified = queryString.stringify(parsed)
// => 'foo=unicorn&ilike=pizza'

location.search = stringified
// note that `location.search` automatically prepends a question mark
console.log(location.search)
// => '?foo=unicorn&ilike=pizza'
