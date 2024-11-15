"use client"
import React from 'react'
import Image from 'next/image';
import {X} from 'lucide-react';

export const FriendRequestModal = () => {
  const friend_request = {id: "MC152355", image: "/avatars/next.jpeg", name: "Braum", url: "/"};

  return (
    <div className='fixed bottom-2 right-0 left-0'>
      <div
        className='flex py-4 gap-4 flex-col mx-auto w-[450px] rounded-2xl h-[140px] justify-between bg-neutral-900 border items-center '>
        <div className='flex w-full px-4 justify-between items-center'>
          <p className='text-2xl'>Friend Request</p>
          <X onClick={() => {
          }} className=' border mb-1 border-gray-200 p-1 w-6 h-6 rounded-full  hover:cursor-pointer  hover:opacity-60'/>
        </div>

        <div className="flex w-full px-4 justify-between">
          {/* <div className="grid mt-2 gap-2 items-center 2xl:grid-cols-12 grid-cols-12 mr-2"> */}
          <div className=" items-center xl:h-[75px] flex gap-2">
            <Image
              src={friend_request.image}
              width={60}
              height={60}
              alt={`News ${friend_request.id}`}
              className=" xl:w-[55px] items-center xl:h-[55px] w-[30px] h-[30px] flex gap-2 aspect-square rounded-xl"
            />
            <div className="grid text-[1vw] w-[10px]">
              <p className=' text-[1.2vw]'>{friend_request.name}</p>
              <p className="opacity-50 flex w-36">ID: {friend_request.id}</p>
            </div>
          </div>

          <div className="items-center  w-min flex flex-col gap-2">
            <button onClick={() => {}}
                    className=' hover:bg-opacity-70 from-[#12DD89] bg-from-[#14F195]   shadow-green-950  bg-green-500 bg-gradient-to-b px-10 rounded-full from-[10%]'>
              Accept
            </button>
            <button onClick={() => {
            }}
                    className=' hover:bg-opacity-70 from-[#dd1212] bg-from-[#14F195]   shadow-red-950  bg-red-500 bg-gradient-to-b px-10 rounded-full from-[10%]'>
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
