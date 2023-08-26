const routes = {
  home: '/',
  admin: '/admin',
  users: '/users',
} as const

// routes.admin = 'whatever'

// type TypeOfRoutes = typeof routes
type RouteKeys = keyof typeof routes

// type Route = (typeof routes)[keyof typeof routes]
type Home = (typeof routes)['home']
type Route = (typeof routes)[RouteKeys]

// function goToRoute(route: '/' | '/admin' | '/users') { }
// function goToRoute(route: keyof typeof routes) {}

function goToRoute(route: Route) {}

goToRoute(routes.users)
