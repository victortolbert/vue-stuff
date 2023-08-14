import { graphql, rest } from 'msw'

interface LoginBody {
  username: string
}

interface LoginResponse {
  username: string
  firstName: string
}

export const posts = [
  {
    userId: 1,
    id: 1,
    title: 'first post title',
    body: 'first post body',
  },
  {
    userId: 2,
    id: 5,
    title: 'second post title',
    body: 'second post body',
  },
  {
    userId: 3,
    id: 6,
    title: 'third post title',
    body: 'third post body',
  },
]

const jsonPlaceHolder = graphql.link('https://jsonplaceholder.ir/graphql')

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
  // Handles a POST /login request
  // rest.post<LoginBody, LoginResponse>('/login', (req, res, ctx) => {
  //   // Persist user's authentication in the session
  //   sessionStorage.setItem('is-authenticated', 'true')

  //   return res(
  //     // Respond with a 200 status code
  //     ctx.status(200),
  //   )
  // }),

  // Handles a GET /user request
  rest.get('/user', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated')

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      )
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),

  rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(posts))
  }),

  jsonPlaceHolder.query('posts', (req, res, ctx) => {
    return res(
      ctx.data({
        posts,
      }),
    )
  }),
] as any[]
