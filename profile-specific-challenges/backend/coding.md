# Challenges

## Computer Science & Competitive Programming

1. Build an LRU Cache. Get detailed requirements at https://leetcode.com/problems/lru-cache/

2. Lowest Common Ancestor at https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/

3. https://leetcode.com/problems/maximize-happiness-of-selected-children/description/

4. Write an algorithm to flatten an Array and one to flatten an object. (turn all keys into top-level keys)

## Code Design

Coding design challenges prompt the candidate to navigate ambiguity and general implementational knowledge. Solutions can be evaluated in usefulness, coding fluency and communication.

1. Design and Implement a command line's argument parser. The parser should allow named and unnamed parameters and parameter validation.

2. Resolve [FindParent](https://silverdev.notion.site/Challenge-FindParent-59672103482c4675be9ba6b532241785?pvs=4)

3. Design and Implement a Rate Limiter Middleware. The rate limiter receives a Req object and can return if the response should be rate-limited or not. Consider concepts like client retries, tolerance, and caching when designing this component.

Hint:
```
function rateLimiterMiddleware(req, res) {
  // if condition
  //   res.status('XXX')
  res.status('200')
}
```

## Chess Check

Model a chess board and a function that can check if a King is on Check. In chess, a King is in check if any rival piece, according to its own movement mechanics, may capture the king in the next move.

You may see the rules of each piece in chess [here](https://www.chess.com/terms/chess-pieces)

**Bonus**: detect if there is a CheckMate

Tips: The key to solving this challenge elegantly is picking the right model and implementation strategy.

## Sudoku Generator

Create a function that creates a valid and playable Sudoku board.

You may see the rules of Sudoku [here](https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/)

**Bonus**: add a difficulty parameter to the generator. The difficulty criteria are ambiguous, so you can choose your definition for this task.
