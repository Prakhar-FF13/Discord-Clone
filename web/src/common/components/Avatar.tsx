import styled from "@emotion/styled";

interface AvatarProps {
  username: string;
  large?: boolean;
}

const AvatarPreview = styled("div")({
  height: "42px",
  width: "42px",
  backgroundColor: "#5865f2",
  borderRadius: "42px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  marginLeft: "5px",
  color: "white",
});

export default function Avatar({ username, large = false }: AvatarProps) {
  return (
    <>
      <AvatarPreview style={large ? { height: "80px", width: "80px" } : {}}>
        {username.substring(0, 2)}
      </AvatarPreview>
    </>
  );
}
