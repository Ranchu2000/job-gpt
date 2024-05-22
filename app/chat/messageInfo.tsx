interface Props {
  tokenCount: number;
  messageCount: number;
  time: string;
}
const MessageInfo = ({ tokenCount, messageCount, time }: Props) => {
  return (
    <div className="bg-red-500 pl-2">
      <h1>MessageInfo</h1>
      <ul>
        <li>Token Count: {tokenCount}</li>
        <li>Message Count: {messageCount}</li>
        <li>Time: {time}</li>
      </ul>
    </div>
  );
};
export default MessageInfo;
