# Coding Challenges

The bible of coding challenges is Cracking the Coding Interview. The book contains a good source of explanations, problems and even hints on how to solve many of them, as well as solutions.

We recommend reading the Abridged Problems version that includes some of the theory behind interviewing challenges, as well as the technical bases to solve the challenges themselves.

## Getting Started

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install CLI dependencies:
   ```bash
   cd ../cli
   npm install
   npm run build
   cd ../technical-fundamentals
   ```
4. Run the Jest test suite:
   ```bash
   npm test
   ```

### Running Tests
You can run tests for specific problems by providing the problem name to Vitest.

For example:

```bash
npx vitest -t minimalTree
```

Or run tests for a specific category:

```bash
npm run strings
npm run lists
npm run stacks
npm run trees
npm run recursion
```

## Submitting Your Solutions

Once you've completed the coding challenges and all tests pass, you can submit your solutions to the Silver.dev Candidate Portal using our CLI tool.

### First Time Setup

1. Authenticate with your Silver account:
   ```bash
   npm run cli:login
   ```
   This will open your browser to authenticate. Your session will remain active for 30 days.

### Submitting Solutions

2. Complete the challenges for a category (e.g., strings, lists, trees)
3. Run the tests to ensure they all pass:
   ```bash
   npm run strings
   ```
4. Submit your solutions:
   ```bash
   npm run cli:submit strings
   ```

The CLI will:
- ✓ Verify you haven't modified any test files
- ✓ Run all tests to ensure they pass
- ✓ Collect your solution code
- ✓ Submit everything to the portal
- ✓ Provide a link to view your submission

### Other CLI Commands

- `npm run cli:status` - View your submission progress across all categories
- `npm run cli:whoami` - Check which account you're authenticated as
- `npm run cli:logout` - Sign out from the CLI

**Important:** The CLI verifies that test files haven't been modified. Make sure you're only editing solution files in the `problems/` directory, not the test files in `__tests__/`.

## Contributing
1. Fork the repository.
2. Create a new branch for your solution:
```bash
git checkout -b feature/your-solution
```
3. Implement your solution and ensure all tests pass.
4. Push your changes to your fork.
5. Open a pull request to the main repository, and mention @conanbatt for review.

## Challenge Platforms

[NeetCode](https://neetcode.io/) is a free platform to practice mostly javascript challenges. The paid version supports other languages.

[HackerRank](https://www.hackerrank.com/) is a freemium platform for developers.
It includes Interview Prepping kits like https://www.hackerrank.com/interview/preparation-kits
