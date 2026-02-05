# Portal API Requirements for CLI Integration

This document describes the API endpoints that need to be implemented in the candidate portal at `https://app.silver.dev` to support the CLI submission workflow.

## Overview

The CLI authenticates users via Clerk device authorization flow and submits their coding challenge solutions to the portal. The portal needs to:

1. Validate Clerk JWT tokens
2. Accept submission payloads
3. Store submissions in Supabase
4. Return submission history

## Authentication

All API endpoints require authentication using Clerk JWT tokens.

**Headers:**
```
Authorization: Bearer <clerk-jwt-token>
```

The portal should validate the JWT token using Clerk's backend SDK and extract the user information from the token.

## API Endpoints

### 1. Submit Solution

**Endpoint:** `POST /api/submissions/submit`

**Headers:**
- `Authorization: Bearer <clerk-jwt-token>`
- `Content-Type: application/json`

**Request Body:**
```typescript
{
  user_id: string;           // Clerk user ID
  email: string;             // User email from Clerk
  category: 'strings' | 'lists' | 'stacks' | 'trees' | 'recursion';
  success_token: string;     // MD5 hash of sorted test names
  passed_tests: string[];    // Array of test names that passed
  test_timestamp: string;    // ISO timestamp when tests ran
  solutions: Array<{
    problem_id: string;      // Problem identifier (e.g., "01", "02")
    file_path: string;       // Relative path to solution file
    code: string;            // Solution code content
    code_hash: string;       // SHA256 hash of the code
  }>;
  cli_version: string;       // CLI version used for submission
  git_commit?: string;       // Optional git commit hash
}
```

**Response:**
```typescript
{
  submission_id: string;     // Unique submission ID
  status: 'accepted' | 'rejected';
  message: string;           // Success or error message
  view_url: string;          // URL to view submission in portal
}
```

**Status Codes:**
- `200` - Submission accepted
- `401` - Authentication failed (invalid or expired token)
- `409` - Duplicate submission (if you want to prevent resubmissions)
- `422` - Validation error (invalid data)
- `500` - Server error

**Validation:**
1. Verify JWT token is valid using Clerk SDK
2. Extract user_id from token and verify it matches payload
3. Validate category is one of the allowed values
4. Validate success_token format (32-character hex string)
5. Validate passed_tests array is not empty
6. Validate solutions array contains valid data

**Business Logic:**
1. Check if user has already submitted this category (optional)
2. Store submission in database
3. Generate submission view URL
4. Return response

### 2. Get Submission Status

**Endpoint:** `GET /api/submissions/status`

**Headers:**
- `Authorization: Bearer <clerk-jwt-token>`

**Query Parameters:**
- `user_id` (string, required) - User ID to fetch submissions for

**Response:**
```typescript
Array<{
  id: string;                // Submission ID
  category: string;          // Category name
  passed_tests: number;      // Number of tests passed
  total_tests: number;       // Total tests in category
  submitted_at: string;      // ISO timestamp
  status: string;            // Submission status
}>
```

**Status Codes:**
- `200` - Success
- `401` - Authentication failed
- `500` - Server error

### 3. Get Submission Details

**Endpoint:** `GET /api/submissions/:id`

**Headers:**
- `Authorization: Bearer <clerk-jwt-token>`

**Path Parameters:**
- `id` (string, required) - Submission ID

**Response:**
```typescript
{
  id: string;
  user_id: string;
  email: string;
  category: string;
  success_token: string;
  passed_tests: string[];
  test_timestamp: string;
  solutions: Array<{
    problem_id: string;
    file_path: string;
    code: string;
    code_hash: string;
  }>;
  submission_timestamp: string;
  cli_version: string;
  git_commit?: string;
  status: string;
}
```

**Status Codes:**
- `200` - Success
- `401` - Authentication failed
- `404` - Submission not found
- `500` - Server error

## Supabase Database Schema

### submissions table

```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('strings', 'lists', 'stacks', 'trees', 'recursion')),
  success_token TEXT NOT NULL,
  passed_tests JSONB NOT NULL,
  test_timestamp TIMESTAMP NOT NULL,
  solutions JSONB NOT NULL,
  submission_timestamp TIMESTAMP DEFAULT NOW(),
  cli_version TEXT,
  git_commit TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_category ON submissions(category);
CREATE INDEX idx_submissions_user_category ON submissions(user_id, category);
CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);

-- Unique constraint to prevent duplicate submissions (optional)
-- CREATE UNIQUE INDEX idx_submissions_unique ON submissions(user_id, category);
```

**Column Details:**

- `id` - Primary key, auto-generated UUID
- `user_id` - Clerk user ID (extracted from JWT)
- `email` - User email (extracted from JWT or payload)
- `category` - Challenge category (validated enum)
- `success_token` - MD5 hash for verification
- `passed_tests` - JSONB array of test names
- `test_timestamp` - When tests were run
- `solutions` - JSONB array of solution objects
- `submission_timestamp` - When submission was received
- `cli_version` - CLI version for debugging
- `git_commit` - Git commit hash (optional)
- `status` - Submission status (pending, accepted, rejected, etc.)
- `created_at` - Record creation timestamp
- `updated_at` - Record update timestamp

## Implementation Checklist

### Backend (Portal API)

- [ ] Install Clerk backend SDK
- [ ] Create middleware to validate JWT tokens
- [ ] Implement `POST /api/submissions/submit` endpoint
- [ ] Implement `GET /api/submissions/status` endpoint
- [ ] Implement `GET /api/submissions/:id` endpoint
- [ ] Add request validation for all endpoints
- [ ] Add error handling and logging
- [ ] Add rate limiting (optional but recommended)

### Database (Supabase)

- [ ] Create `submissions` table with schema above
- [ ] Create indexes for performance
- [ ] Set up Row Level Security (RLS) policies
- [ ] Configure backups

### Frontend (Portal UI)

- [ ] Create submission list page
- [ ] Create submission detail page
- [ ] Add device authorization flow UI (`/device` route)
- [ ] Display submission statistics
- [ ] Add code viewer for submitted solutions

## Testing

### Test Scenarios

1. **Successful submission**
   - Valid JWT token
   - All tests passed
   - Valid payload
   - Expected: 200 response with submission ID

2. **Invalid authentication**
   - Missing or expired JWT token
   - Expected: 401 response

3. **Duplicate submission** (if enforced)
   - User submits same category twice
   - Expected: 409 response

4. **Invalid payload**
   - Missing required fields
   - Invalid category
   - Empty solutions array
   - Expected: 422 response

5. **Fetch submission history**
   - Valid user_id
   - Expected: Array of submissions

### Sample Test Request

```bash
curl -X POST https://app.silver.dev/api/submissions/submit \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user_abc123",
    "email": "test@example.com",
    "category": "strings",
    "success_token": "5d41402abc4b2a76b9719d911017c592",
    "passed_tests": ["test1", "test2", "test3"],
    "test_timestamp": "2026-02-05T15:30:00Z",
    "solutions": [
      {
        "problem_id": "01",
        "file_path": "technical-fundamentals/coding/problems/01_isUnique.ts",
        "code": "export function isUnique(str: string): boolean { ... }",
        "code_hash": "abc123def456..."
      }
    ],
    "cli_version": "1.0.0",
    "git_commit": "abc123def456"
  }'
```

## Security Considerations

1. **JWT Validation**
   - Always validate JWT tokens using Clerk's official SDK
   - Check token expiration
   - Verify token signature

2. **Authorization**
   - Ensure users can only access their own submissions
   - Verify user_id from token matches request data

3. **Input Validation**
   - Sanitize all user input
   - Validate file paths to prevent directory traversal
   - Limit payload size (e.g., max 10MB per submission)

4. **Rate Limiting**
   - Limit submissions per user per time period
   - Prevent abuse and DoS attacks

5. **Data Privacy**
   - Store submission data securely
   - Implement proper access controls
   - Consider GDPR compliance for user data

## Error Responses

All error responses should follow this format:

```typescript
{
  error: string;        // Error type
  message: string;      // Human-readable error message
  details?: any;        // Optional additional details
}
```

**Examples:**

```json
{
  "error": "authentication_failed",
  "message": "Invalid or expired authentication token"
}
```

```json
{
  "error": "validation_error",
  "message": "Invalid category specified",
  "details": {
    "category": "Must be one of: strings, lists, stacks, trees, recursion"
  }
}
```

## Questions?

For questions or clarifications about the API requirements, please contact the CLI development team.
