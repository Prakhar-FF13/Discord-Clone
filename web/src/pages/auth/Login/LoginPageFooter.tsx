import PrimaryButton from "../../../common/components/PrimaryButton";

interface LoginPageFooterProps {
  isFormValid: boolean;
  handleLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoginPageFooter = ({
  handleLogin,
  isFormValid,
}: LoginPageFooterProps) => {
  return (
    <PrimaryButton
      label="Log In"
      additionalStyles={{ marginTop: "30px" }}
      disabled={!isFormValid}
      onClick={handleLogin}
    />
  );
};

export default LoginPageFooter;
