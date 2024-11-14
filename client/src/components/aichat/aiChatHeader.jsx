import { useState, useEffect } from 'react';
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import Sidebar from './sidebar';
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

 
  

export default function AiChatHeader(props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  }


  return (
    <header className='flex items-center justify-between bg-gray-800 p-4'>
      <div className='flex items-center mr-10'> 
        <button onClick={toggleSidebar}  className= 'bg-btnGray rounded-full p-[5px] text-white mr-5'>
          <IoReorderThreeOutline className='text-3xl text-yellow' />
        </button>
        {isSidebarOpen && <Sidebar />}
        <span className='flex flex-col ml-2 my-0 space-y-0'>
          <h1 className='text-header tracking-tighter font-bold my-0 '>{props.newChat}</h1>
          <DateComponent className="my-0" />
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
  );
}