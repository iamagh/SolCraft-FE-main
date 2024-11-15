"use client"
import PendingFriendsList from './pending-friends-list';
import FriendsList from './socials-friends-list';
import React from 'react'

const SocialsPage = () => {
  return (
    <div className="w-[calc(100vw-106px)]  text-white  h-[calc(100vh-120px)] px-6 ">
        <div className='grid md:grid-cols-2 gap-6 w-full h-full'>
            <div className="w-full h-[calc(100vh-146px)] border overflow-auto border-neutral-800 bg-gradient-to-b from-[-100%] from-neutral-800 rounded-2xl bg-dark p-4">
                <FriendsList/>
            </div>
            <div className='flex flex-col gap-6'>
                <div className='h-[80px] flex justify-between w-full border  border-neutral-800 bg-gradient-to-b from-[-20%] from-neutral-800 rounded-2xl bg-dark p-4' style={{contain : "content"}}>
                    <input className='bg-transparent flex flex-grow text-lg h-full !outline-none' placeholder='Insert Name Here'></input>
                    <button onClick={() => {}}  className=' hover:bg-opacity-70 from-[#12DD89] bg-from-[#14F195]   shadow-green-950  bg-green-500 bg-gradient-to-b px-10 rounded-full from-[10%]'>
                        Send Friend Request
                    </button>
                </div>
                <div className="w-full h-[calc(100vh-250px)] border overflow-auto border-neutral-800 bg-gradient-to-b from-[-100%] from-neutral-800 rounded-2xl bg-dark p-4">
                    <PendingFriendsList/>
                </div>          
            </div>
            
        </div>
        
    </div>
  )
}

export default SocialsPage