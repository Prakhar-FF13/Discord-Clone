import { styled } from "@mui/material";

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  widths: "100%",
});

const Label = styled("p")({
  color: "#b9bbbe",
  textTransform: "uppercase",
  fontWeight: 600,
  fontSize: "16px",
});

const Input = styled("input")({
  flex: 1,
  height: "40px",
  border: "1px solid black",
  borderRadius: "5px",
  color: "#dcddde",
  backgroundColor: "#35393f",
  margin: 0,
  fontSize: "16px",
  padding: "0 5px",
});

interface InputWithLabelsProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  type: string;
  placeholder: string;
}

const InputWithLabels = ({
  value,
  setValue,
  label,
  type,
  placeholder,
}: InputWithLabelsProps) => {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={handleValueChange}
        type={type}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

export default InputWithLabels;
