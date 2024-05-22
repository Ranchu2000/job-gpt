const MessageContent = ({ content }: { content: string }) => {
  return (
    <div className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 text-white shadow-md">
      <p>{content}</p>
    </div>
  );
};
export default MessageContent;
