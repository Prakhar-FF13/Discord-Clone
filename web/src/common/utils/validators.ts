export const validateEmail = (mail: string) => {
  // prettier-ignore
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return emailPattern.test(mail);
};

export const validatePassword = (password: string) => {
  return password.length >= 6 && password.length <= 12;
};

export const validateUsername = (username: string) => {
  return username.length >= 3 && username.length <= 12;
};

export function validateLoginForm({
  mail,
  password,
}: {
  mail: string;
  password: string;
}) {
  const isMailValid = validateEmail(mail);
  const isPasswordValid = validatePassword(password);

  return isMailValid && isPasswordValid;
}

export function validateRegisterForm({
  mail,
  password,
  username,
}: {
  mail: string;
  password: string;
  username: string;
}) {
  const isMailValid = validateEmail(mail);
  const isPasswordValid = validatePassword(password);
  const isUsernameValid = validateUsername(username);

  return isMailValid && isPasswordValid && isUsernameValid;
}
