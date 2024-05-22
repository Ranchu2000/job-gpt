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
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-5 text-white">
      <div className="text-2xl font-bold mb-5">Conversation</div>
      <MessageBody conversation={conversation}></MessageBody>
      <MessageForm messageContent={handleConversationMessage}></MessageForm>
    </div>
  );
};
export default Body;
