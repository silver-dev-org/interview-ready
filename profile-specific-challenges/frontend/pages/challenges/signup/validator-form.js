import { ERROR_MESSAGES } from "./error-messages";

const PASSWORD_MIN_LENGHT = 8;

function validateLength(email) {
  if (email.length !== 0) {
    return { valid: true, error: undefined };
  }
  return { valid: false, error: ERROR_MESSAGES.EMAIL.LENGTH_ZERO };
}

function validateAt(email) {
  if (email.includes("@")) {
    return { valid: true, error: undefined };
  }

  return { valid: false, error: ERROR_MESSAGES.EMAIL.NOT_AT };
}

function validateDot(email) {
  const hasAt = validateAt(email);

  if (hasAt && email.split("@")[1].includes(".")) {
    return { valid: true, error: undefined };
  }

  return { valid: false, error: ERROR_MESSAGES.EMAIL.NOT_DOT };
}

export function validateEmail(email) {
  const isNotEmpty = validateLength(email);
  if (isNotEmpty.error) {
    return isNotEmpty;
  }

  const hasAt = validateAt(email);
  if (hasAt.error) {
    return hasAt;
  }
  const hasDot = validateDot(email);

  if (hasDot.error) {
    return hasDot;
  }

  if (hasDot.valid && hasAt.valid && isNotEmpty.valid) {
    return { valid: true, error: undefined };
  }
}

function validateLenghtPassword(password) {
  if (password.length === 0) {
    return { valid: false, error: ERROR_MESSAGES.PASSWORD.LENGTH_ZERO };
  }

  if (password.length > PASSWORD_MIN_LENGHT) {
    return { valid: true, error: undefined };
  }

  return { valid: false, error: ERROR_MESSAGES.PASSWORD.INVALID_LENGTH };
}

function validateSpecialCharacter(password) {
  if (password.match(/\W/)) {
    return { valid: true, error: undefined };
  }
  return { valid: false, error: ERROR_MESSAGES.PASSWORD.NOT_SPECIAL_CHAR };
}

function validateNumber(password) {
  if (password.match(/[0-9]+/)) {
    return { valid: true, error: undefined };
  }

  return { valid: false, error: ERROR_MESSAGES.PASSWORD.NOT_NUMBER };
}

export function validatePassword(password) {
  const isValidLenght = validateLenghtPassword(password);
  if (isValidLenght.error) {
    return isValidLenght;
  }

  const hasNumber = validateNumber(password);

  if (hasNumber.error) {
    return hasNumber;
  }

  const hasSpecialChars = validateSpecialCharacter(password);
  if (hasSpecialChars.error) {
    return hasSpecialChars;
  }

  if (isValidLenght.valid && hasSpecialChars.valid && hasNumber.valid) {
    return true;
  }
}
