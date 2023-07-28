import { Typography } from "@mui/material";

export default function FriendsTitle({ title }: { title: string }) {
  return (
    <>
      <Typography
        sx={{
          textTransform: "uppercase",
          color: "#8e9297",
          fontSize: "14px",
          marginTop: "10px",
        }}
      >
        {title}
      </Typography>
    </>
  );
}
