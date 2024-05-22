const MessageProfile = ({ profile }: { profile: "human" | "assistant" }) => {
  //TODO based on profile display image or access globally stored name
  return (
    <div
      className={`rounded-full p-2 shadow-lg ${
        profile === "human"
          ? "bg-gradient-to-r from-blue-500 to-teal-500"
          : "bg-gradient-to-r from-red-500 to-yellow-500"
      } text-white`}
    >
      {profile}
    </div>
  );
};
export default MessageProfile;
