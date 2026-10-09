# Backend API

## Register a user

Creates a user account and returns an authentication token.

### Request

```http
POST /users/register
Content-Type: application/json
```

The route is mounted at `/users` in the Express app, so the full path is
`/users/register`. Send a JSON object with this shape:

```json
{
  "fullname": {
    "firstname": "Alex",
    "lastname": "Morgan"
  },
  "email": "alex@example.com",
  "password": "secret123"
}
```

| Field | Required | Requirements |
| --- | --- | --- |
| `fullname.firstname` | Yes | At least 3 characters. |
| `fullname.lastname` | No | If supplied, at least 3 characters. |
| `email` | Yes | Must be a valid email address. |
| `password` | Yes | At least 6 characters. It is hashed before being stored. |

Example:

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d "{\"fullname\":{\"firstname\":\"Alex\",\"lastname\":\"Morgan\"},\"email\":\"alex@example.com\",\"password\":\"secret123\"}"
```

Replace the host and port with the address where the backend is running.

### Responses

| Status code | Description |
| --- | --- |
| `200 OK` | Registration succeeded. The JSON response contains `token` and `user`. |
| `400 Bad Request` | One or more request fields failed validation. The JSON response contains an `errors` array with validation details. |

#### `200 OK` — Successful registration

Example response:

```json
{
  "token": "<generated-jwt>",
  "user": {
    "_id": "652f1a2b3c4d5e6f7890abcd",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Morgan"
    },
    "email": "alex@example.com",
    "password": "$2b$10$<bcrypt-hash>"
  }
}
```

The controller returns the created user document, including its hashed
`password` value. The password is not returned in plaintext. The token is
signed using the backend's `JWT_SECRET` environment variable.

#### `400 Bad Request` — Validation failed

Example response when the email is invalid:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "not-an-email",
      "msg": "invalid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```
