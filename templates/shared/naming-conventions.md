# Naming Conventions

## Files
| Type | Pattern | Example |
|------|---------|---------|
| Component | PascalCase | `UserProfile.tsx` |
| Utility | camelCase | `formatDate.ts` |
| Hook | use prefix | `useAuth.ts` |
| API route | kebab-case | `user-profile.ts` |
| Test | +.test suffix | `formatDate.test.ts` |

## Variables
| Type | Convention | Example |
|------|-----------|---------|
| Variable | camelCase | `userName` |
| Constant | UPPER_SNAKE | `MAX_RETRIES` |
| Function | camelCase verb | `getUserById` |
| Class/Type | PascalCase | `UserService` |
| Boolean | is/has prefix | `isActive` |

## Database
| Type | Convention | Example |
|------|-----------|---------|
| Table | snake_case plural | `user_profiles` |
| Column | snake_case | `first_name` |
| Index | idx_{table}_{col} | `idx_users_email` |

## API
| Type | Convention | Example |
|------|-----------|---------|
| Endpoint | kebab-case plural | `/api/user-profiles` |
| Query param | camelCase | `?sortBy=createdAt` |
| Error code | UPPER_SNAKE | `USER_NOT_FOUND` |
