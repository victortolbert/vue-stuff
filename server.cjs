const jsonServer = require('json-server')

const port = 3005
const server = jsonServer.create()
const router = jsonServer.router('data.json')
const middleware = jsonServer.defaults()

server.use(middleware)

server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

server.use('/api', router)

server.listen(port, () => {
  console.log(`JSON Server is running  on ${port}`)
})
