/**
  Naming
  Privacy
  separation of concerns
  Invalid states
  Composition(& Delegation) over Inheritance
*/

function codeRunner(submission) {
  return submission;
}

class Candidate {
  #interviews = [];
  #name;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  startInterview(interview) {
    if (this.currentInterview) {
      throw new Error(
        "Candidate has an active Interview. Do not start a new one"
      );
    }

    this.#interviews.push(interview);
  }

  submit(code) {
    if (!this.currentInterview) {
      throw new Error("Submitting code without interview");
    }

    this.currentInterview.processSubmission(code);
  }

  get currentInterview() {
    return this.#interviews.filter(
      (interview) => interview.status === "pending"
    )[0];
  }

  get passedInterviews() {
    return this.#interviews.filter(
      (interview) => interview.status === "passed"
    );
  }
}

class InterviewStatus {
  #expectation;
  #status;

  constructor({ expectation }) {
    this.#expectation = expectation;
    this.#status = "pending";
  }

  get status() {
    return this.#status;
  }

  processResults(results) {
    const passed = results === this.#expectation;
    this.#status = passed ? "passed" : "failed";
    return this.status;
  }
}

class LiveCodingInterview {
  #interviewStatus;

  constructor() {
    this.#interviewStatus = new InterviewStatus({ expectation: "passed" });
  }

  processSubmission(submission) {
    const result = codeRunner(submission);
    this.#interviewStatus.processResults(result);
    return this.status;
  }

  get status() {
    return this.#interviewStatus.status;
  }
}

const candidate = new Candidate("Gabriel");
const interview = new LiveCodingInterview();
candidate.startInterview(interview);
candidate.submit("passed");

console.assert(candidate.name === "Gabriel");
console.assert(candidate.passedInterviews.includes(interview));
console.assert(!candidate.currentInterview);
