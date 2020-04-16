# express-mate

> Helper library that makes your life a little easier when working with Express REST APIs

The express-mate library is designed to be 'plug-and-play'. It exposes a bunch of helper functions and classes that can be used in your project however you like.

## Handlers

Handlers are express request handlers that handle the express-mate response objects. `createHandler` creates a handler function that can be added to an express router.

```typescript
import { createHandler } from 'express-mate';

export const helloWorld = createHandler((req, res) => {
  return new ApiSuccess(res, 'Hello World!');
});

// Add the handler to the express router
router.get('/hello-world', helloWorld);
```

### Error Handling

The express-mate handlers catch all errors thrown inside them and handle them by responding to the client.

The ApiError response object extends the native error object so it can be safely thrown like a native Error object.

> If you want express-mate to ignore errors and pass them to the next express middleware function, this can be done using [settings](#settings)

## Hooks

Hooks are functions that 'hook' into a express router with a endpoints all starting at a specified endpoint.

```typescript
import { createHook } from 'express-mate';

export const helloWorldGet = createHandler((req, res) => {
  return new ApiSuccess(res, 'Hello World!');
});

export const helloWorld = createHook('/hello-world', (router) => {
  // Endpoint: /hello-world/hello
  router.get('/hello', helloWorldGet);
});

// Add the hook to the express router
router.use('/', helloWorld);
```

## Response Objects

All response objects use the [JSend](https://github.com/omniti-labs/jsend) standard by default, but this is optional and can be disabled using [settings](#settings).

- ApiSuccess
- ApiFail
- ApiForbidden
- ApiUnauthorized
- ApiNotFound

#### Usage

```typescript
import { ApiSuccess } from 'express-mate';

router.post('/hello-world', (req, res, next) => {
  try {
    return ApiSuccess.respond(res, 'Hello World!');
  } catch (err) {
    return next(err);
  }
});

router.post(
  '/hello-world',
  createHandler((req, res, next) => {
    return new ApiSuccess(res, 'Hello World!');
  })
);

/**
 * Both output:
 *
 * HTTP 200
 * {
 *   "status": "success",
 *   "data": "Hello World!"
 * }
 */
```

## Settings

```typescript
import { Settings as ExpressMateSettings, createHandler } from 'express-mate';

// Global settings (for all handlers)
// Defaults
ExpressMateSettings.responseFormat = 'jsend'; // 'jsend' | 'none'
ExpressMateSettings.handleErrors = true;
ExpressMateSettings.ignoreNativeErrors = false;

// Handlers can also have their own custom settings
const handler = createHandler(() => {}, { responseFormat: 'none' });
```

## Helpers

#### getReq(req, key)

The `getReq` function returns a value from the express request object and will return undefined if no value is found.

```typescript
import { getReq } from 'express-mate';

const hello = getReq(req, 'hello');
// If 'hello' exists: hello = req.hello
// Else: hello = undefined
```

#### setReq(req, key, value)

The `setReq` function safely adds a value to the express request object.

```typescript
import { setReq } from 'express-mate';

const hello = setReq(req, 'hello', 'world');
```

#### assertReq(req, key)

The `assertReq` function returns a value from the express request object and will throw an error if no value is found.

```typescript
import { assertReq } from 'express-mate';

const hello = assertReq(req, 'hello');
// If 'hello' exists: hello = req.hello
// Else: throw Error('Expected req.hello');
```
