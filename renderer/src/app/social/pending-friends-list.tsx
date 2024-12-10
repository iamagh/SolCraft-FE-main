import React from 'react'
import Image from 'next/image';
import { IoChatbubble } from 'react-icons/io5';
import { Plus, X } from 'lucide-react';

const PendingFriendsList = () => {
    const friends = [
        { id: "MC152345", image: "/avatars/next.jpeg", name: "Chino", url: "/" },
        { id: "MC152355", image: "/avatars/next.jpeg", name: "Braum", url: "/" },
        { id: "MC112345", image: "/avatars/next.jpeg", name: "Scoot", url: "/" },
      ];
  return (
    <div>
        <div className=''>
        <div className="h-[90%] xl:h-auto grid py-2 gap-4  overflow-auto">
          {friends.map((item, index) => (
              <div className="flex justify-between items-center xl:my-2 h-min" key={index}>
                {/* <div className="grid mt-2 gap-2 items-center 2xl:grid-cols-12 grid-cols-12 mr-2"> */}
                <div className="xl:w-[75px] items-center xl:h-[75px] w-[30px] h-[30px] flex gap-2">
                  <Image
                    src={item.image}
                    width={48}
                    height={48}
                    alt={`News ${item.id}`}
                    className=" xl:w-[75px] items-center xl:h-[75px] w-[30px] h-[30px] flex gap-2 aspect-square rounded-xl"
                  />
                  <div className="grid text-[1vw] w-[10px]">
                    <p className=' text-[1.2vw]'>{item.name}</p>
                    <p className="opacity-50 flex w-36">ID: {item.id}</p>
                  </div>
                </div>

                <div className=" pl-8 items-center flex">
                    <Plus onClick={() => {}} className='m-2 border border-gray-200 p-1 w-8 h-8 rounded-full  hover:cursor-pointer  hover:opacity-60'/>
                    <X onClick={() => {}}  className='m-2 border border-gray-200 p-1 w-8 h-8 rounded-full  hover:cursor-pointer  hover:opacity-60'/>    
                </div>
              </div>
          ))}
        </div>
        </div>
    </div>
  )
}

export default PendingFriendsList