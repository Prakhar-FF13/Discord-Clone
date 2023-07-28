import PrimaryButton from "../../../common/components/PrimaryButton";

export default function AddFriendButton() {
  const handleOpenAddFriendDialog = () => {};

  return (
    <>
      <PrimaryButton
        label="Add Friend"
        additionalStyles={{
          marginTop: "10px",
          marginLeft: "5px",
          width: "80%",
          height: "30px",
          background: "#3ba55d",
        }}
        disabled={false}
        onClick={handleOpenAddFriendDialog}
      />
    </>
  );
}
