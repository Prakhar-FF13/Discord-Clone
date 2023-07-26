import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import AuthBox from "../../../common/components/AuthBox";
import RegisterPageInputs from "./RegisterPageInput";
import RegisterPageFooter from "./RegisterPageFooter";
import { validateRegisterForm } from "../../../common/utils/validators";

const RegisterPage = () => {
  const [mail, setMail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleRegister = () => {
    console.log(mail, username, password);
  };

  useEffect(() => {
    setIsFormValid(validateRegisterForm({ username, password, mail }));
  }, [mail, password, username, setIsFormValid]);

  return (
    <>
      <AuthBox>
        <Typography variant="h5" sx={{ color: "white" }}>
          Create an account
        </Typography>
        <RegisterPageInputs
          mail={mail}
          setMail={setMail}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        <RegisterPageFooter
          isFormValid={isFormValid}
          handleRegister={handleRegister}
        />
      </AuthBox>
    </>
  );
};

export default RegisterPage;
