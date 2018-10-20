# express-mate

Helper library that makes your life a little easier when working with Express REST APIs

## Router

The Router is a helper tool which wraps around the existing [Express Router](https://expressjs.com/en/4x/api.html#router) to create more functionality and to make defining routes clearer. It takes a **verbosity over terseness** approach and is designed to handle large scale APIs.

> It may look like more code at first but it really helps demistify the routes.

```typescript
const GET = Router.createRoutes(RequestType.GET, [
  {
    path: '/',
    steps: [
      async (req, res) => {
        res.end('Hello World!');
      }
    ]
  },
]);

const PATCH = Router.createRoutes(RequestType.PATCH, [
  {
    path: '/',
    steps: [
      async (req, res) => {
        res.end('Hello PATCH!');
      }
    ]
  }
]);

const POST = Router.createRoutes(RequestType.POST, [
  {
    path: '/',
    steps: [
      (req, res) => {
        res.end('Hello POST!');
      }
    ]
  }
]);

const MISC = [
  {
    type: RequestType.GET,
    path: '/hello',
    steps: []
  }
];

const router = new Router(GET, PATCH, POST, MISC);
```

## Response Objects

All response objects follow the [JSend](https://labs.omniti.com/labs/jsend) guidelines.

A basic JSend-compliant response is as simple as this:

```json
{
  "status": "success",
  "data": "hello world!"
}
```

### ApiSuccess

### ApiError

### ApiUnauthorized

### ApiForbidden
