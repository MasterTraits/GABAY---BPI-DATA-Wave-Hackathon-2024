import React, { useContext } from 'react'
import { useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export default function Sidebar({prevChat}) {
    const [closeSideBar, useCloseSideBar] = useState(false)

    const toggleSidebar = () => {
        useCloseSideBar(!closeSideBar)
    }

    const [openSideBar, useOpenSideBar] = useState(false)

    const toggleSidebarOpen = () => {
        useOpenSideBar(!openSideBar)
    }

return (
    <section  className={`fixed top-0 left-0 h-full w-4/5 bg-header
        transition-transform duration-300 ease-in-out 
        ${closeSideBar ? '-translate-x-full' : 'translate-x-0'} 
        bg-opacity-90 backdrop-blur-sm z-10`}
    >
        <section className='flex-col justify-between items-center p-4 text-grayText '>
            <header className='flex justify-start items-center'>
                <button className='flex justify-center items-center bg-header h-[3.5rem] w-[15rem] rounded-full '>
                    <p className='text-lg text-white'>New Advice</p> 
                    <FaPlus className='ml-3' />
                </button>
                <button onClick={toggleSidebar} className='ml-5'>
                    <FaArrowRight className='text-xl'/>
                </button>
            </header>

            <div className="flex items-center mt-3 bg-header rounded-full p-4 max-w-[20rem]">
              <input
                  type="text"
                  placeholder="Search..."
                  className="flex-grow bg-header  focus:outline-none"
              />
                    <CiSearch className="ml-3  text-xl" />
            </div>
                
            <br />
                {/* change color here to gray ish */}
            <hr className='' />

             <article className='mt-2 mb-3'>
                <p className='text-sm '>Previous 7 days</p>
                <h1>{prevChat}</h1>
             </article>
             <br />
            <hr className='' />

            <article className='mt-2 mb-3'>
            <p className='text-sm'>Previous 7 days</p>
            </article>
        </section>
    </section>
)
}