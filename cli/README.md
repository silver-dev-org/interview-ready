# Interview Ready CLI

CLI tool for submitting coding challenge solutions to the Interview Ready portal.

## Installation

After cloning the repository:

```bash
cd cli
npm install
npm run build
```

## Usage

All commands should be run from the `technical-fundamentals/` directory:

### Authentication

```bash
npm run cli:login
```

This will start the device authorization flow. Visit the URL shown and enter the code to authenticate. Your session will remain active for 30 days.

### Submit Solutions

```bash
npm run cli:submit <category>
```

Where `<category>` is one of: `strings`, `lists`, `stacks`, `trees`, `recursion`

Example:
```bash
npm run cli:submit strings
```

The CLI will:
1. Verify you're authenticated
2. Check that test files haven't been modified
3. Run all tests for the category
4. Collect your solution code
5. Submit to the portal

### View Progress

```bash
npm run cli:status
```

Shows your submission progress across all categories.

### Check Current User

```bash
npm run cli:whoami
```

Displays your authenticated user information.

### Logout

```bash
npm run cli:logout
```

Clears your authentication tokens.

## How It Works

### Authentication
The CLI uses Clerk's device authorization flow:
1. Request device code from Clerk
2. Display verification URL and code
3. Poll Clerk API until authorized
4. Store JWT tokens locally (30-day expiration)

### Test Integrity
Before submission, the CLI verifies test file integrity:
- Uses git to compare local test files with `origin/main`
- Rejects submission if any test file has been modified
- Ensures candidates only edit solution files, not tests

### Test Execution
- Runs existing npm test scripts (e.g., `npm run strings`)
- Uses custom Vitest reporter to capture test results
- Generates MD5 hash from test names as success token

### Solution Collection
- Finds all solution files for the category
- Reads solution code
- Generates SHA256 hash for each file
- Includes file paths and problem IDs

### Submission
- Sends all data to portal API at `https://app.silver.dev`
- Portal validates JWT token with Clerk
- Stores submission in Supabase database

## Configuration

Configuration is stored in `~/.config/interview-ready-cli/config.json`

Contains:
- Authentication tokens (access_token, refresh_token)
- User information (user_id, email)
- Token expiration timestamp
- Last submission data

## Security

- Tokens stored with user-only permissions (0600)
- Tokens expire after 30 days
- Test file integrity verified before submission
- All solution files hashed with SHA256
- JWT bearer tokens used for API authentication

## Development

### Build
```bash
npm run build
```

### Watch mode
```bash
npm run dev
```

## Error Handling

Common error scenarios:

- **Not authenticated**: Run `npm run cli:login`
- **Test files modified**: Revert changes to test files
- **Tests failed**: Fix failing tests before submitting
- **Network error**: Check internet connection
- **Already submitted**: Warning shown, can resubmit

## Environment Variables

Create a `.env` file in the `/cli` directory:

```env
PORTAL_API_URL=https://app.silver.dev
CLERK_PUBLISHABLE_KEY=pk_live_...
DEVICE_AUTH_ENDPOINT=https://api.clerk.com/v1/oauth/device
TOKEN_ENDPOINT=https://api.clerk.com/v1/oauth/token
TOKEN_EXPIRY_SECONDS=2592000
```

## License

MIT
