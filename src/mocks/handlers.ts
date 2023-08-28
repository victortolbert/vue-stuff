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
export const acceptPaymentTransaction = {
  "createTransactionRequest": {
    "merchantAuthentication": {
      "name": "8dzC8Xb48hf",
      "transactionKey": "5s59CE9D9Jb4Cmwr"
    },
    "refId": "123456",
    "transactionRequest": {
      "transactionType": "authCaptureTransaction",
      "amount": "5",
      "payment": {
        "opaqueData": {
          "dataDescriptor": "COMMON.ACCEPT.INAPP.PAYMENT",
          "dataValue": "1234567890ABCDEF1111AAAA2222BBBB3333CCCC4444DDDD5555EEEE6666FFFF7777888899990000"
        }
      },
      "lineItems": {
        "lineItem": {
          "itemId": "1",
          "name": "vase",
          "description": "Cannes logo",
          "quantity": "18",
          "unitPrice": "45.00"
        }
      },
      "poNumber": "456654",
      "billTo": {
        "firstName": "Ellen",
        "lastName": "Johnson",
        "company": "Souveniropolis",
        "address": "14 Main Street",
        "city": "Pecan Springs",
        "state": "TX",
        "zip": "44628",
        "country": "US"
      },
      "shipTo": {
        "firstName": "China",
        "lastName": "Bayles",
        "company": "Thyme for Tea",
        "address": "12 Main Street",
        "city": "Pecan Springs",
        "state": "TX",
        "zip": "44628",
        "country": "US"
      },
      "customerIP": "192.168.1.1",
      "userFields": {
        "userField": [
          {
            "name": "MerchantDefinedFieldName1",
            "value": "MerchantDefinedFieldValue1"
          },
          {
            "name": "favorite_color",
            "value": "blue"
          }
        ]
      }
    }
  }
}

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
