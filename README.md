# express-mate

> Helper library that makes your life a little easier when working with Express REST APIs

## Router

The Router is a helper tool which wraps the existing [Express Router](https://expressjs.com/en/4x/api.html#router) for helpful functionality. It takes a *verbosity over terseness* approach and is designed to make large routing files clearer.

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
      async (req, res) => {
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

### ApiSuccess

Successful response!

```json
{
  "status": "success",
  "data": "hello world!"
}
```

### ApiError

Standard error response.

```json
{
  "status": "error",
  "message": "You left the oven on!",
  "data": "[Error: You left the oven on!]"
}
```

### ApiUnauthorized

Unsuccessful authentication.

```json
{
  "status": "unauthenticated",
  "message": "Authentication required"
}
```

### ApiForbidden

Successful authentication without required permissions.

```json
{
  "status": "forbidden",
  "message": "Access denied"
}
```

### ApiFail

Commonly used for validation error responses.

```json
{
  "status": "bad request",
  "data": {
    "email": "Email is required"
  }
}
```

### ApiNotFound

Data requested does not exist.

```json
{
  "status": "not found"
}
```
