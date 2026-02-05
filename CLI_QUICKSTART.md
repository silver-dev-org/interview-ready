# CLI Quick Start Guide

## Setup (First Time Only)

1. **Install CLI dependencies:**
   ```bash
   cd cli
   bun install
   bun run build
   cd ../technical-fundamentals
   ```

2. **Login to your Silver account:**
   ```bash
   npm run cli:login
   ```

   This will display a URL and code. Visit the URL in your browser and enter the code to authenticate.

## Workflow

### 1. Work on Challenges

Navigate to a problem in `technical-fundamentals/coding/problems/` and implement your solution.

For example, edit `01_isUnique.ts`:
```typescript
export function isUnique(str: string): boolean {
  // Your implementation here
  const seen = new Set<string>();
  for (const char of str) {
    if (seen.has(char)) return false;
    seen.add(char);
  }
  return true;
}
```

### 2. Run Tests

Test your solution for a specific category:
```bash
npm run strings   # For strings problems
npm run lists     # For linked list problems
npm run stacks    # For stack/queue problems
npm run trees     # For tree/graph problems
npm run recursion # For recursion problems
```

### 3. Submit When All Tests Pass

Once all tests pass:
```bash
npm run cli:submit strings
```

The CLI will:
- ✓ Verify you're authenticated
- ✓ Check that test files haven't been modified (anti-cheating)
- ✓ Re-run all tests to confirm they pass
- ✓ Collect your solution code
- ✓ Submit to the Interview Ready portal
- ✓ Provide a link to view your submission

### 4. Check Your Progress

```bash
npm run cli:status
```

This shows your progress across all categories:
```
📊 Your Interview Ready Progress

┌────────────┬────────┬────────────┬─────────────────────┐
│ Category   │ Status │ Tests      │ Submitted           │
├────────────┼────────┼────────────┼─────────────────────┤
│ strings    │ ✓ PASS │ 9/9        │ 2 days ago          │
│ lists      │ ⏳ TODO│ 0/9        │ Not submitted       │
│ trees      │ ⏳ TODO│ 0/10       │ Not submitted       │
│ stacks     │ ⏳ TODO│ 0/6        │ Not submitted       │
│ recursion  │ ⏳ TODO│ 0/8        │ Not submitted       │
└────────────┴────────┴────────────┴─────────────────────┘

Progress: 1/5 categories completed
```

## Other Commands

- **Check authentication status:**
  ```bash
  npm run cli:whoami
  ```

- **Logout:**
  ```bash
  npm run cli:logout
  ```

- **Show help:**
  ```bash
  npm run cli
  ```

## Important Notes

⚠️ **Test File Integrity**
- The CLI verifies that test files in `__tests__/` haven't been modified
- Only edit files in the `problems/` directory
- If you modify test files, your submission will be rejected

⚠️ **Authentication**
- Your session lasts 30 days
- If your session expires, run `npm run cli:login` again

⚠️ **Resubmissions**
- You can submit multiple times for the same category
- Each submission creates a new record in the portal

## Troubleshooting

### "Not authenticated" error
```bash
npm run cli:login
```

### "Test files have been modified" error
You've edited files in `__tests__/`. Revert those changes:
```bash
git checkout technical-fundamentals/__tests__/
```

### "Tests failed" error
Fix your solution until all tests pass:
```bash
npm run <category>
```

### "Failed to connect to portal" error
Check your internet connection and try again.

### Build errors after updating CLI
Rebuild the CLI:
```bash
cd cli
bun run build
cd ../technical-fundamentals
```

## Getting Help

- Run `npm run cli` to see all available commands
- Check the `/cli/README.md` for detailed documentation
- Contact the Silver team if you encounter issues

## Categories & Test Counts

| Category  | Tests | Topics |
|-----------|-------|--------|
| strings   | 9     | String manipulation, permutations |
| lists     | 9     | Linked lists, pointers |
| stacks    | 6     | Stacks, queues |
| trees     | 10    | Binary trees, graphs, tries |
| recursion | 8     | Dynamic programming, recursion |

**Total: 42 coding challenges**

Good luck! 🚀
