import MessageContent from "./messageContent";
import MessageInfo from "./messageInfo";
import MessageProfile from "./messageProfile";
interface MessageBodyProps {
  conversation: string[];
}

const MessageBody = ({ conversation }: MessageBodyProps) => {
  let messageInfo = {
    tokenCount: 10,
    messageCount: 20,
    time: "10:00",
  };

  return (
    <div className="my-2 h-96 flex-col overflow-y-auto bg-green-700 p-3">
      {conversation.map((message, index) => (
        <div className="">
          <div
            className={`m-2 flex  items-center space-x-4 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
          >
            {index % 2 === 0 && (
              <>
                <MessageContent content={message} />
                <MessageProfile profile="human" />
              </>
            )}
            {index % 2 !== 0 && (
              <>
                <MessageProfile profile="assistant" />
                <MessageContent content={message} />
              </>
            )}
            {/*<MessageInfo {...messageInfo}></MessageInfo> */}
          </div>
        </div>
      ))}
    </div>
  );
};
export default MessageBody;