import PrimaryButton from "../../../common/components/PrimaryButton";
import RedirectInfo from "../../../common/components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
interface RegisterPageFooterProps {
  isFormValid: boolean;
  handleRegister: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const getFormNotValidMessage = () => {
  return "Enter correct email and password (6-12 characters)";
};

const getFormValidMessage = () => {
  return "Press to register!";
};

const RegisterPageFooter = ({
  handleRegister,
  isFormValid,
}: RegisterPageFooterProps) => {
  const navigate = useNavigate();

  const handlePushToLoginPage = () => {
    navigate("/login");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <PrimaryButton
            label="Register"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text=""
        redirectText="Already have an account? "
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};

export default RegisterPageFooter;
