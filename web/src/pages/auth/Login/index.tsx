import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";

import AuthBox from "../../../common/components/AuthBox";
import LoginPageHeader from "./LoginPageHeader";
import LoginPageInputs from "./LoginPageInput";
import LoginPageFooter from "./LoginPageFooter";
import { validateLoginForm } from "../../../common/utils/validators";
import { getActions } from "../../../store/actions/authActions";
import { AppDispatch } from "../../../store/store";
import { User } from "../../../commonTypes";

const LoginPage = ({
  login,
}: {
  login: (userDetails: User, navigate: NavigateFunction) => void;
}) => {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = () => {
    const userDetails: User = {
      Email: mail,
      Password: password,
    };

    login(userDetails, navigate);
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

const mapActionsToProps = (dispatch: AppDispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
