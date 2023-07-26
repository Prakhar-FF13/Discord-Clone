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

const validateEmail = (mail: string) => {
  // prettier-ignore
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return emailPattern.test(mail);
};

const validatePassword = (password: string) => {
  return password.length >= 6 && password.length <= 12;
};
