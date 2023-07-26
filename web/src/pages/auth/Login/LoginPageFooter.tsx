import PrimaryButton from "../../../common/components/PrimaryButton";
import RedirectInfo from "../../../common/components/RedirectInfo";
import { useNavigate } from "react-router-dom";
interface LoginPageFooterProps {
  isFormValid: boolean;
  handleLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

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
      <PrimaryButton
        label="Log In"
        additionalStyles={{ marginTop: "30px" }}
        disabled={!isFormValid}
        onClick={handleLogin}
      />
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
