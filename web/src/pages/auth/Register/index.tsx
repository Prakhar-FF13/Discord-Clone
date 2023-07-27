import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { connect } from "react-redux";

import AuthBox from "../../../common/components/AuthBox";
import RegisterPageInputs from "./RegisterPageInput";
import RegisterPageFooter from "./RegisterPageFooter";
import { validateRegisterForm } from "../../../common/utils/validators";
import { AppDispatch } from "../../../store/store";
import { getActions } from "../../../store/actions/authActions";
import { User } from "../../../commonTypes";
import { NavigateFunction, useNavigate } from "react-router-dom";

const RegisterPage = ({
  register,
}: {
  register: (userDetails: User, navigate: NavigateFunction) => void;
}) => {
  const [mail, setMail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    const userDetails: User = {
      email: mail,
      password: password,
      username: username,
    };

    register(userDetails, navigate);
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

const mapActionsToProps = (dispatch: AppDispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(RegisterPage);
