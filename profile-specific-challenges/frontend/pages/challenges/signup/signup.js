import { useState } from "react";
import { validateEmail, validatePassword } from "./validator-form";

export default function SignupFormResult({ sendData }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError(undefined);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    const { valid: emailValid, error: emailError } = validateEmail(email);

    if (!emailValid && emailError) {
      setError(emailError);
      return;
    }

    const { valid: passValid, error: passError } = validatePassword(password);

    if (!passValid && passError) {
      setError(passError);
      return;
    }

    setError(undefined);

    setIsLoading(true);

    try {
      const { success, error } = await sendData();

      if (error) setError(error);

      alert(success);
      setIsLoading(false);
      setForm({ email: "", password: "" });
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" value={form.email} onChange={onChange} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={form.password} onChange={onChange} />

        <button disabled={isLoading} type="submit">
          Sign Up
        </button>
      </form>

      {error && <div className="error-container">{error}</div>}
    </>
  );
}
