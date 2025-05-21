// non-declarative naming
function mapToBooleans(array) {
  return array.map(Boolean);
}

class Player {}
let player;

// declarative naming mismatch
function getOrCreatePlayer() {
  if (!player) {
    player = new Player();
  }
  return player;
}

// use named parameters
function evaluateChallenge({ challenge, result, candidate, difficulty }) {
  if (challenge === result) {
    return `${candidate} has successfully completed the ${difficulty} challenge`;
  }
  return `${candidate}'s submission is incorrect`;
}

// Oversplitting functions - "The rule of 3"
function wordCounter(string) {
  const words = string.split(" ");

  const wordCount = words.reduce((hash, word) => {
    hash[word] ??= 0;

    hash[word]++;

    return hash;
  }, {});

  return wordCount;
}

// Avoid sideEffects

const tracker = {};

function countViews(key) {
  const views = tracker[key] || 0;

  return views + 1;
}

// Variables & Control Flow
/**
- Declarative Variable Naming
- Avoid Magic Numbers
- Avoid comments - code as documentation
- Avoid while loops
- Avoid large Conditional clauses
- Variable scoping
- Do not modify inputs
- Cyclomatic Complexity
    - Early returns
    - Replace nesting with variables or top level fn calls
*/

function groupByAgeGroups(people) {
  const minors = [];
  const adults = [];
  const elderly = [];

  const hasAge = (person) => person.age;

  people.filter(hasAge).forEach((person) => {
    const ELDERLY_AGE_THRESHOLD = 60;
    const ADULT_AGE_THRESHOLD = 18;

    if (person.age > ELDERLY_AGE_THRESHOLD) {
      elderly.push(person);
      return;
    }

    if (person.age > ADULT_AGE_THRESHOLD) {
      adults.push(person);
      return;
    }

    minors.push(person);
  });

  return [minors, adults, elderly];
}

// General Programming

// Dry
function createBoard({ rows, cols }) {
  return Array(rows)
    .fill(0)
    .map(() => Array(cols));
}

function initTicTacToe() {
  const board = createBoard({ rows: 3, cols: 3 });
  board[1][1] = "X";
  return board;
}

function initConnect4() {
  const board = createBoard({ rows: 6, cols: 7 });
  board[0][0] = "O";
  return board;
}

function initSudoku() {
  return createBoard({ rows: 9, cols: 9 });
}

// Over-abstractions

function completeInterview(candidate, interview, result) {
  interview.finished();

  if (result === "passed") {
    candidate.passed();
    candidate.submitOffer();
  } else {
    candidate.failed();
    candidate.submitFeedback();
  }
}

// Atomicity

function transferMoney(sender, receiver, amount) {
  sender.funds -= amount;

  if (sender.funds < 0) {
    sender.funds += amount;
    throw new Error("Insufficient funds");
  }

  if (receiver.disabledUser()) {
    throw new Error("Receiver is unable to receive funds");
  }

  receiver.funds += amount;
  return [sender, receiver];
}

// General over specific

function formatSerialNames(name, version) {
  return `series-${name}-${version}`;
}

function formatProductNames(name, series) {
  return `${series}-product-${name}`;
}

// Error handling

// Defensive Programming (Questionable)

function validateUser(user) {
  if (typeof user !== "object" || user.constructor.name !== "User") {
    return false;
  }
  const hasName = !!user.name;
  return hasName;
}

// Invariant Programming (Good!)

function validateUser(user) {
  const validUser =
    typeof user === "object" && user.constructor.name === "User";
  console.assert(validUser, "Invalid user object", user);
  const hasName = !!user.name;
  return hasName;
}

// Error Management

// Catch what you can handle
// Add context
// Do not eat errors

const MAX_RETRIES = 3;

async function updateUserBad(user, retries) {
  try {
    await API.updateUser(user);
  } catch (e) {
    if (MAX_RETRIES === 3) {
      return;
    }

    if (isFetchError(e)) {
      return updateUserBad(user, retries + 1);
    }
    throw e;
  }

  return user;
}

async function updateUserGood(user, retries) {
  try {
    await API.updateUser(user);
  } catch (e) {
    if (MAX_RETRIES === 3) {
      throw new Error(
        `User ${user.id} was not updated after ${retries} retries.`,
      );
    }

    if (isFetchError(e)) {
      console.warn(
        `Updating user ${user.id} failed due to a fetch error. Retrying... (${retries + 1}/${MAX_RETRIES})`,
      );
      return updateUserGood(user, retries + 1);
    }
    console.error(
      `Updating user ${user.id} failed due to an unexpected error. Retries: ${retries}.`,
    );
    throw e;
  }

  return user;
}

// Cohesion vs Dependency

class StringUtils {
  stringCleaner(string) {
    return string.trim().replaceAll("%20", " ");
  }

  formatEmail(emailService) {
    let result = emailService.message;
    if (emailService.options.trim) {
      result = stringCleaner(string);
    }
    return result;
  }
}

class EmailService {
  message;
  options = { trim: true };

  constructor(message, options) {
    this.message = message;
    this.options = options;
  }
  sendEmail() {
    StringUtils.formatEmail(this);
  }
}

const emailService = new EmailService(" test email ", { trim: true });
emailService.sendEmail();
