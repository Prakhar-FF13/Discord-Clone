import { useState, useEffect } from "react";

import AuthBox from "../../../common/components/AuthBox";
import LoginPageHeader from "./LoginPageHeader";
import LoginPageInputs from "./LoginPageInput";
import LoginPageFooter from "./LoginPageFooter";
import { validateLoginForm } from "../../../common/utils/validators";

const LoginPage = () => {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Login in");
  };

  return (
    <AuthBox>
      <LoginPageHeader />
      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
    </AuthBox>
  );
};

export default LoginPage;
