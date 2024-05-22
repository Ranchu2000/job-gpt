"use client";
interface MessageFormProps {
  messageContent: (message: string[]) => void;
}
import { useEffect, useState } from "react";

const MessageForm = ({ messageContent }: MessageFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState<string[]>([]);
  const [assistantId, setAssistantId] = useState<string>("");
  const getAssistant = async () => {
    console.log("current assistant id", assistantId);
    const response = await fetch("/api/submitPrompt", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  };
  useEffect(() => {
    messageContent(conversation);
  }, [conversation]);

  const clearChat = () => {
    setConversation([]);
  };
  useEffect(() => {
    const fetchAssistantId = async () => {
      if (assistantId === "") {
        const newAssistantId = await getAssistant();
        setAssistantId(newAssistantId.assistantId);
      }
    };
    fetchAssistantId();
  }, []);
  const handleSubmit = async (event: React.FormEvent) => {
    setIsPending(true);
    event.preventDefault();
    setConversation((prevConversation) => [...prevConversation, prompt]);
    const response = await fetch("/api/submitPrompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assistantId, prompt }),
    });
    let responseText = "";
    // setConversation((prevConversation) => [...prevConversation, responseText]);
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    for (;;) {
      const { done, value } = await (
        reader as ReadableStreamDefaultReader<Uint8Array>
      )?.read();
      if (done) break;

      try {
        responseText += decoder.decode(value);
        console.log(responseText);
        setConversation((prevConversation) => [
          ...prevConversation,
          responseText,
        ]);
      } catch (e: any) {
        console.warn(e.message);
      }
    }
    setPrompt("");
    setIsPending(false);
  };
  return (
    <div className="flex items-center">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="flex gap-5 font-semibold">
          <label htmlFor="prompt">Prompt</label>
          <input
            type="text"
            name="prompt"
            id="prompt"
            placeholder="Enter your prompt here"
            aria-required
            required
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></input>
        </div>
        <button
          type="submit"
          className="rounded-md bg-slate-950 p-2 text-slate-50"
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Send Prompt"}
        </button>
      </form>
      <button
        onClick={clearChat}
        className="ml-auto rounded-md bg-slate-950 p-2 text-slate-50"
      >
        Clear Chat
      </button>
    </div>
  );
};
export default MessageForm;
