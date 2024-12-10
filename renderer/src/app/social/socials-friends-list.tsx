import React from 'react'
import Image from 'next/image';
import { IoMdEye } from 'react-icons/io';
import { FaTrash } from 'react-icons/fa';
import { IoChatbubble, IoChatbubbleOutline } from 'react-icons/io5';

const FriendsList = () => {
    const friends = [
        { id: "MC152345", image: "/avatars/next.jpeg", name: "Chino", url: "/", isOnline: true },
        { id: "MC152355", image: "/avatars/next.jpeg", name: "Braum", url: "/", isOnline: false },
        { id: "MC112345", image: "/avatars/next.jpeg", name: "Scoot", url: "/", isOnline: true },
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

                <div className=" pl-8 items-center  flex gap-2">
                  {item.isOnline && (
                    <div className="hover:cursor-pointer bg-green-400 rounded-full w-[1.4vw] h-[1.4vw] hover:opacity-60"></div>
                  )}
                
                  <div onClick={() => {}}  className=" hover:cursor-pointer text-[1.5vw] hover:opacity-60 text-neutral-600  from-[-100%] from-neutral-800 items-center">
                    <IoChatbubble color="gray"  />
                  </div>
                </div>
              </div>
          ))}
        </div>
        </div>
    </div>
  )
}

export default FriendsList