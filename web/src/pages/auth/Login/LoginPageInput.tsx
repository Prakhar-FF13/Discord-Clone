import InputWithLabels from "../../../common/components/InputWithLabels";

interface LoginPageInputProps {
  mail: string;
  setMail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const LoginPageInputs = ({
  mail,
  setMail,
  password,
  setPassword,
}: LoginPageInputProps) => {
  return (
    <>
      <InputWithLabels
        value={mail}
        setValue={setMail}
        label="email"
        type="text"
        placeholder="Enter Email Address"
      />
      <InputWithLabels
        value={password}
        setValue={setPassword}
        label="password"
        type="password"
        placeholder="Enter Password"
      />
    </>
  );
};

export default LoginPageInputs;
