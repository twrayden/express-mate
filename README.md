# express-mate

> Helper library that makes your life a little easier when working with Express REST APIs

## Error Handler

The custom error handler catches ApiObjects thrown in `next(err)` and handles them appropriately.

#### Setup

```typescript
import { errorHandler } from 'express-mate';

express.use(errorHandler());
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
