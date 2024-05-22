"use client";
import { useState } from "react";
import MessageBody from "./messageBody";
import MessageForm from "./messageForm";

const Body = () => {
  const [conversation, setConversation] = useState<string[]>([]);
  const handleConversationMessage = async (newConversation: string[]) => {
    setConversation(newConversation);
  };
  return (
    <div className="h-full bg-red-700 p-5">
      <div className="text-xl font-semibold">Conversation</div>
      <MessageBody conversation={conversation}></MessageBody>
      <MessageForm messageContent={handleConversationMessage}></MessageForm>
    </div>
  );
};
export default Body;
