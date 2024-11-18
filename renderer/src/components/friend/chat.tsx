"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { ChevronRight, X } from 'lucide-react';

// todo continue from here
const Chat = ({chat}: any) => {

  const user_id = "MC122349"
  const friends = [
    { id: "MC152345", image: "/avatars/next.jpeg", name: "Chino", url: "/", isOnline: true },
    { id: "MC152355", image: "/avatars/next.jpeg", name: "Braum", url: "/", isOnline: false },
    { id: "MC112345", image: "/avatars/next.jpeg", name: "Scoot", url: "/", isOnline: true },
  ];

  // const chat = {
  //   friend: friends[0],
  //   chatlog: [
  //     {id: 1, text: "Hello, how are you doing?", time: "08:15 AM", sender: "MC152345"},
  //     {id: 2, text: "Fine. You?", time: "08:45 AM", sender: "MC122349"},
  //     {id: 3, text: "Fine", time: "08:55 AM", sender: "MC152345"},
  //   ]
  // }

  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div onClick={() => {
        setIsOpen(true)
      }} className='fixed hover:cursor-pointer rounded-xl right-2 bottom-2 h-[80px] w-[450px] border bg-neutral-900'>
        <div className="flex w-full px-4 rounded-2xl h-[80px] justify-between border bg-neutral-900 items-center ">
          {/* <div className="grid mt-2 gap-2 items-center 2xl:grid-cols-12 grid-cols-12 mr-2"> */}
          <div className=" items-center xl:h-[75px] flex gap-2">
            <Image
              src={chat.friend.image || "/avatars/next.jpeg"}
              width={60}
              height={60}
              alt={`News ${chat.friend.id}`}
              className=" xl:w-[55px] items-center xl:h-[55px] w-[30px] h-[30px] flex gap-2 aspect-square rounded-xl"
            />
            <div className="grid text-[1vw] w-[10px]">
              <p className=' text-[1.2vw]'>{chat.friend.name}</p>
              <p className="opacity-50 flex w-36">ID: {chat.friend.id}</p>
            </div>
          </div>

          <div className="items-center  w-min flex gap-2">
            {chat.friend.isOnline && (
              <div
                className="hover:cursor-pointer bg-green-400 rounded-full w-[1.4vw] h-[1.4vw] hover:opacity-60"></div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className=' fixed right-0 bottom-0 '>
      <div className="h-[750px] w-[450px] flex flex-col border rounded-2xl">
        <div className="flex w-full px-4 rounded-t-2xl h-[80px] justify-between bg-neutral-900 items-center ">
          {/* <div className="grid mt-2 gap-2 items-center 2xl:grid-cols-12 grid-cols-12 mr-2"> */}
          <div className=" items-center xl:h-[75px] flex gap-2">
            <X onClick={() => {
              setIsOpen(false)
            }} className='m-2 border border-gray-200 w-6 h-6 rounded-full p-1  hover:cursor-pointer hover:opacity-60' />
            <Image
              src={chat.friend.image}
              width={60}
              height={60}
              alt={`News ${chat.friend.id}`}
              className=" xl:w-[55px] items-center xl:h-[55px] w-[30px] h-[30px] flex gap-2 aspect-square rounded-xl"
            />
            <div className="grid text-[1vw] w-[10px]">
              <p className=' text-[1.2vw]'>{chat.friend.name}</p>
              <p className="opacity-50 flex w-36">ID: {chat.friend.id}</p>
            </div>
          </div>

          <div className="items-center  w-min flex gap-2">
            {chat.friend.isOnline && (
              <div
                className="hover:cursor-pointer bg-green-400 rounded-full w-[1.4vw] h-[1.4vw] hover:opacity-60"></div>
            )}
          </div>

        </div>
        <div className='w-full p-4 bg-dark flex-grow'>
          {chat.chatlog.map((item:any) => (
            <div key={item.id}>
              {
                item.sender === user_id ? (
                  <div className='flex justify-between'>
                    <div className=''></div>
                    <div className='w-[45%]'>
                      <div
                        className='flex bg-gradient-color bg-neutral-800 p-2 rounded-xl'>
                        {item.text}
                      </div>
                      <p className=' text-neutral-400'> {item.time}</p>
                    </div>

                  </div>

                ) : (
                  <div className='w-[50%] text-end'>
                    <p className='text-start text-neutral-400'>
                      {chat.friend.name}
                    </p>
                    <div style={{ background: "linear-gradient(88.57deg, #9945FF 0.11%, #14F195 100.1%)" }}
                      className='flex text-start bg-gradient-color p-2 rounded-xl'>
                      {item.text}
                    </div>
                    <p className=' text-neutral-400'> {item.time}</p>
                  </div>
                )
              }
            </div>
          ))}
        </div>
        <div className=' w-full px-4 rounded-b-2xl h-[80px] items-center bg-neutral-900 flex'>
          <div className='h-[60px] flex gap-2 justify-between w-full p-2' style={{ contain: "content" }}>
            <input className='bg-transparent flex flex-grow text-lg h-full !outline-none'
              placeholder='Message..' />
            <button onClick={() => {
            }}
              className=' hover:bg-opacity-70 from-[#12DD89] bg-from-[#14F195]   shadow-green-950  bg-green-500 bg-gradient-to-b items-center p-2.5 rounded-full from-[10%]'>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
