# Error Handling Patterns

## API Error Response
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "User with ID 123 not found"
  }
}
```

## HTTP Status Codes
| Status | Use Case |
|:------:|----------|
| 200 | Success (GET/PUT/PATCH) |
| 201 | Created (POST) |
| 204 | Deleted (no body) |
| 400 | Bad request format |
| 401 | Not authenticated |
| 403 | Not authorized |
| 404 | Not found |
| 409 | Conflict (duplicate) |
| 422 | Validation failed |
| 429 | Rate limited |
| 500 | Server error |

## Pattern: Validate at boundary, trust internally
```typescript
function createUser(input: unknown): User {
  const parsed = schema.parse(input); // boundary validation
  const user = new User(parsed);       // internal (trusted)
  return await db.create(user);        // DB constraints as safety net
}
```
