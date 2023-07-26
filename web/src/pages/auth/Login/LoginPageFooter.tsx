import PrimaryButton from "../../../common/components/PrimaryButton";
import RedirectInfo from "../../../common/components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
interface LoginPageFooterProps {
  isFormValid: boolean;
  handleLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const getFormNotValidMessage = () => {
  return "Enter correct email and password (6-12 characters)";
};

const getFormValidMessage = () => {
  return "Press to log in!";
};

const LoginPageFooter = ({
  handleLogin,
  isFormValid,
}: LoginPageFooterProps) => {
  const navigate = useNavigate();

  const handlePushToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <PrimaryButton
            label="Log In"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Need an Account? "
        redirectText=" Create an account"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};

export default LoginPageFooter;
