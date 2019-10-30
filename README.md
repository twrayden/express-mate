# express-mate

> Helper library that makes your life a little easier when working with Express REST APIs

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
  "message": "You left the oven on!"
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
