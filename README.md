# express-mate

> Helper library that makes your life a little easier when working with Express REST APIs

## Setup

The express-mate library is designed to be 'plug-and-play'. It exposes a bunch of helper functions and classes that can be used in your project however you like.

#### Error Handler

The custom express-mate error handler catches ApiObjects thrown in `next(err)` and handles them appropriately by responding to the client.

```typescript
import { errorHandler } from 'express-mate';

express.use(errorHandler());
```

## Handlers

Handlers are express request handlers that handle the express-mate repsonse objects. `createHandler` creates a handler function that can be added to an express router.

```typescript
import { createHandler } from 'express-mate';

export const helloWorld = createHandler((req, res) => {
  return new ApiSuccess(res, 'Hello World!');
  /**
   * Response:
   * {
   *   "status": "success",
   *   "data": "Hello World!"
   * }
   */
});


// Add the handler to the express router
router.get('/hello-world', helloWorld);
```

## Hooks

Hooks are functions that 'hook' into a express router with a endpoints all starting at a specified endpoint.

```typescript
import { createHook } from 'express-mate';

export const helloWorldGet = createHandler((req, res) => {
  return new ApiSuccess(res, 'Hello World!');
  /**
   * Response:
   * {
   *   "status": "success",
   *   "data": "Hello World!"
   * }
   */
});

export const helloWorld = createHook('/hello-world', (router) => {
  // Endpoint: /hello-world/hello
  router.get('/hello', helloWorldGet);
});


// Add the hook to the express router
router.use('/', helloWorld);
```

## Helpers

##### checkReq

The `checkReq` function checks the express request handlers `req` object for variables that may have been added to it and want to be accessed safely.

```typescript
import { createHandler, checkReq } = 'express-mate';

export const helloWorld = createHandler((req, res) => {
	const hello = checkReq('hello', req);
  // If hello exists: hello = req.hello
  // Else if hello not found: throw Error('Expected req.hello');
});
```

## Response Objects

All response objects follow the [JSend](https://github.com/omniti-labs/jsend) guidelines.

- ApiSuccess

```typescript
import { ApiSuccess } from 'express-mate';

router.post('/hello-world', (req, res, next) => {
  try {
    return ApiSuccess.respond(res, 'Hello World!');
  } catch (err) {
    return next(err);
  }
});

/**
 * Response:
 *
 * HTTP 200
 * {
 *   "status": "success",
 *   "data": "Hello World!"
 * }
 */
```

- ApiError

```typescript
import { ApiError } from 'express-mate';

router.post('/hello-world', (req, res, next) => {
  try {
    return new ApiError(res, 'Hello World!');
  } catch (err) {
    return next(err);
  }
});

/**
 * Response:
 *
 * HTTP 500
 * {
 *   "status": "error",
 *   "message": "Hello World!"
 * }
 */
```

- ApiFail
- ApiForbidden
- ApiUnauthorized
- ApiNotFound
