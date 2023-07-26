import InputWithLabels from "../../../common/components/InputWithLabels";

interface RegisterPageInputsProps {
  mail: string;
  setMail: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterPageInputs = ({
  mail,
  setMail,
  username,
  setUsername,
  password,
  setPassword,
}: RegisterPageInputsProps) => {
  return (
    <>
      <InputWithLabels
        value={mail}
        setValue={setMail}
        label="email"
        placeholder="Enter your email"
        type="text"
      />
      <InputWithLabels
        value={username}
        setValue={setUsername}
        label="username"
        placeholder="Enter username"
        type="text"
      />
      <InputWithLabels
        value={password}
        setValue={setPassword}
        label="password"
        placeholder="Enter a password"
        type="password"
      />
    </>
  );
};

export default RegisterPageInputs;
