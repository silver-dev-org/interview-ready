import SignupFormResult from "@/pages/challenges/signup/signup";

function API(data) {
  return new Promise((res) => {
    setTimeout(
      () =>
        res({
          success: "Your Account has been successfully created!",
          error: "Username is taken",
        }),
      1000
    );
  });
}

export default function SignupForm() {
  return (
    <>
      <h1>Signup Form</h1>
      <div>
        Build a user Signup form in React with the following features.
        <ol>
          <li>An email and a password input</li>
          <li>Email must have an “@” and the domain side must include a “.”</li>
          Password must include
          <ol>
            <li>At least one special character </li>
            <li>One number </li>
            <li>Be at least 8 characters</li>
          </ol>
          <li>Submission request handling 1. Utilze the mock API function to handle submissions</li>
          <li>Basic aesthetics with pure CSS</li>
        </ol>
      </div>

      <hr />
      <div className="form-container">
        <SignupFormResult sendData={API} />
      </div>
    </>
  );
}
