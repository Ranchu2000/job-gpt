const MessageProfile = ({ profile }: { profile: "human" | "assistant" }) => {
  //TODO based on profile display image or access globally stored name
  return (
    <div className="ml-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-white">
      {profile}
    </div>
  );
};
export default MessageProfile;
