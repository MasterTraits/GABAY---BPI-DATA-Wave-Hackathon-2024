'use client'
import runChat from "@/config/gemini";
import { IoMdSend } from "react-icons/io";
import { GoCopilot } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

import AiChatHeader from "@/components/aichat/aiChatHeader";

const AiPage = () => {
  const router = useRouter();

  const [input, setinput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [previousPrompt, setPreviousPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setresultData] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);

  const onSent = async () => {
    setLoading(true);
    setrecentPrompt(input);
    setShowResult(true);

    const response = await runChat(input);
    const formattedResponse = response.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    setresultData(formattedResponse);

    setConversationHistory([
      ...conversationHistory,
      { type: "user", text: input },
      { type: "ai", text: formattedResponse }
    ]);

    setLoading(false);
    setinput("");
  };

  return (
    <main className="h-screen overflow-hidden bg-background text-black p-6">
      <AiChatHeader newChat="AI Chat" />
      <section className="h-screen bg-background px-5 py-3 items-center justify-center">
        {!showResult ? (
          <section className="flex items-center justify-center mt-[8rem]">
            <div className="flex flex-col items-center justify-center h-[80%] w-auto">
              <span className="flex flex-col items-center justify-center">
                <h1 className="text-[2rem] font-light">Hello Learner!</h1>
              </span>
            </div>
          </section>
        ) : (
          <section className="w-full h-[calc(84vh-5rem)] overflow-y-scroll">
            {conversationHistory.map((message, index) => (
              <div key={index} className={`chat ${message.type === "user" ? "chat-start" : "chat-end"} flex items-start pb-3 mr-3`}>
                {message.type === "user" ? (
                  <div className="bg-gray rounded-full p-[5px] mr-3">
                    <FaUser className="text-3xl text-blue-500" />
                  </div>
                ) : (
                  <div className="bg-gray rounded-full p-[5px] mr-3">
                    <GoCopilot className="text-3xl text-green-500" />
                  </div>
                )}
                <p className="chat-bubble mr-3" dangerouslySetInnerHTML={{ __html: message.text }}></p>
              </div>
            ))}
          </section>
        )}

        <footer className="fixed bottom-0 left-0 right-0 bg-background py-3">
          <div className='flex p-3 items-center justify-between bg-card shadow-md rounded-lg mx-3 h-full'>
            <textarea
              onChange={(e) => setinput(e.target.value)}
              value={input}
              type="text"
              placeholder="Type a message..."
              className='p-1 flex-grow rounded-full bg-card focus:outline-none focus:border-none h-full'
            />
            <button onClick={onSent} className="ml-3">
              <IoMdSend />
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}

export default AiPage;