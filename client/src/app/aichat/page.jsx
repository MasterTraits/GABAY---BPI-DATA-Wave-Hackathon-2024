'use client';

import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { GoCopilot } from 'react-icons/go';
import { IoMdSend } from 'react-icons/io';
import { IoReorderThreeOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { BsPaperclip } from "react-icons/bs";
import Mic from "@/assets/Mic";
import { BsSendArrowDown } from "react-icons/bs";

import runChat from "@/config/gemini"; 

function DateComponent() {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { month: 'short', day: 'numeric' };
    const date = now.toLocaleDateString(undefined, options);
    const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });
    setCurrentDateTime(`${date}, ${time}`);
  }, []);

  return <span className="text-header font-bold my-0">{currentDateTime}</span>;
}

function TypewriterText({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span dangerouslySetInnerHTML={{ __html: displayText }}></span>;
}

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prevChat, setPrevChat] = useState('');
  const [input, setInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const onSent = async () => {
    if (!input) return; // prevent sending empty messages
    setLoading(true);
    setShowResult(true);
    setPrevChat(input);
    const truncatedInput = input.length > 10 ? `${input.substring(0, 10)}...` : input;
    setPrevChat(truncatedInput); 
    const response = await runChat(input);
    const formattedResponse = response.replace(/"([^"]*)\*\*([^*]+)\*\*([^"]*)"/, '"$1<b>$2</b>$3"')
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    setResultData(formattedResponse);

    setConversationHistory([
      ...conversationHistory,
      { type: 'user', text: input },
      { type: 'ai', text: formattedResponse },
    ]);

    setLoading(false);
    setInput('');
  };

  return (
    <main className="h-screen overflow-hidden bg-background text-black p-2">
      {/* Header */}
      <header className='flex items-center justify-between bg-gray-800 p-4'>
        <div className='flex items-center mr-10'>
          <button onClick={toggleSidebar} className='bg-btnGray rounded-full p-[5px] text-white mr-5'>
            <IoReorderThreeOutline className='text-3xl text-yellow' />
          </button>

          {isSidebarOpen && (
            <section className={`fixed top-0 left-0 h-full w-4/5 bg-header transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-opacity-90 backdrop-blur-sm z-10`}>
              <section className='flex-col justify-between items-center p-4 text-grayText'>
                <header className='flex justify-start items-center'>
                  <button className='flex justify-center items-center bg-header h-[3.5rem] w-[15rem] rounded-full '>
                    <p className='text-lg text-grayText'>New Advice</p> 
                    <FaPlus className='ml-3' />
                  </button>
                  <button onClick={toggleSidebar} className='ml-5'>
                    <FaArrowRight className='text-xl' />
                  </button>
                </header>

                <div className="flex items-center mt-3 bg-header rounded-full p-5 max-w-[20rem]">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-grow bg-header focus:outline-none"
                  />
                  <CiSearch className="ml-3 text-xl" />
                </div>

                <br />
                <div className='p-3'>
                <hr className='text-grayText opacity-40'/>
                <article className='mt-2 mb-8 '>
                  <p className='text-sm mb-1 '>Today</p>
                  <h1 className='text-lg'>{prevChat}</h1>
                </article>
                <hr className='mb-8 mt-10 text-grayText opacity-40'/>
                <article className='mt-5 mb-3 '>
                  <p className='text-sm mb-2 '>7 Days Ago</p>
                  <h1 className='font-medium text-lg'>Amongus</h1>
                </article>
                <hr className='mb-8 mt-10 text-grayText opacity-40' />
                </div>
              </section>
            </section>
          )}

          <span className='flex flex-col ml-2 my-0 space-y-0'>
            <h1 className='text-header tracking-tighter font-bold my-0'>AI Chat</h1>
            <DateComponent />
          </span>
        </div>

        <span className='ml-auto flex gap-3'>
          <button className="bg-btnGray rounded-full p-[5px] text-white">
            <FaPlus className='text-3xl text-yellow' />
          </button>
          <button className="bg-btnGray rounded-full p-[5px] text-white">
            <MdClose className='text-3xl text-yellow' />
          </button>
        </span>
      </header>

      {/* Main Chat Section */}
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
              <div 
                key={index} 
                className={`chat flex w-auto h-auto pb-3 mt-5 mr-3 ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "user" ? (
                  <div className="bg-gold text-white px-4 py-2 rounded-lg rounded-br-none max-w-[80%]">
                    <p>{message.text}</p>
                  </div>
                ) : (
                  <div className="flex items-start max-w-[80%]">
                    <div className="rounded-full p-[5px] mr-3 bg-header">
                      <GoCopilot className="text-3xl text-white" />
                    </div>
                    <div className="bg-gray-200 px-4 py-2 rounded-lg rounded-bl-none">
                      <TypewriterText text={message.text} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Footer Input */}
    <footer className="fixed bottom-10 w-full">
      <section className="flex items-center gap-2">
        <div className="flex items-center bg-white rounded-3xl px-4 h-14 w-9/12 drop-shadow-[0_0_20px_rgb(0,0,0,0.25)]">
          <div className="flex gap-4 items-center w-full">
            <div className="relative">
              <BsPaperclip className="text-4xl text-header p-1 rounded-full bg-btnWhite" />
              <input
                type="file"
                className="top-[-3%] absolute w-8 opacity-0"
              />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-lg w-full mr-2 focus:outline-none"
              placeholder="Ask me anything!"
            />
          </div>
          <Mic className="text-4xl text-header p-2.5 rounded-full bg- " />
        </div>
        <button
          onClick={onSent}
          className="relative h-14 w-14 rounded-full bg-blue"
        >
          <BsSendArrowDown className="absolute text-3xl text-btnWhite top-3.5 left-2.5" />
        </button>
      </section>
    </footer>
      </section>
    </main>
  );
}