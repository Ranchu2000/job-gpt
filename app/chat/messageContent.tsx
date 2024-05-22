const MessageContent = ({ content }: { content: string }) => {
  return (
    <div className="flex-1 bg-red-500 p-4">
      <p>{content}</p>
    </div>
  );
};
export default MessageContent;
