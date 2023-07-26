import Button from "@mui/material/Button";

interface PrimaryButtonProps {
  label: string;
  additionalStyles?: {
    [key: string]: string | number;
  };
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PrimaryButton = ({
  label,
  additionalStyles,
  disabled,
  onClick,
}: PrimaryButtonProps) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#5865F2",
        color: "white",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: 600,
        width: "100%",
        height: "40px",
      }}
      style={additionalStyles ? additionalStyles : {}}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
export default PrimaryButton;
