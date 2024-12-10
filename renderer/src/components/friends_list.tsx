import Image from "next/image";
import React, {useCallback, useEffect, useState} from "react";
import {IoChatbubble} from "react-icons/io5";
import axiosInstance from "@/lib/axiosInstance";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {useAuth} from "@/hooks/auth";
import {IFriend} from "@/interfaces/index";


const FriendsList = () => {
  const {isUserLoggedIn} = useAuth();
  
  const [friends, setFriends] = useState<IFriend[]>([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [friendEmail, setFriendEmail] = useState("");
  const [addFriendDialogOpen, setAddFriendDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddFriend = useCallback(() => {
    setLoading(true);
    axiosInstance.post('/user/friends', {
      friendEmail
    })
      .then(() => {
        getFriends();
      })
      .catch()
      .finally(() => {
        setLoading(false);
        setAddFriendDialogOpen(false);
      });
  }, [friendEmail]);

  const getFriends = () => {
    axiosInstance.get(`/user/friends`)
      .then(({data}) => {
        setFriends(data);
      })
      .catch(e => {
        console.log(e)
      });
  };

  const getPendingRequests = () => {
    axiosInstance.get(`/user/friends/pending`)
      .then(({data}) => {
        setPendingFriends(data);
      })
      .catch(e => {
        console.log(e)
      });
  };

  useEffect(() => {
    getFriends();
    getPendingRequests();
  }, []);

  return (
    <div className="py-4 rounded-xl  text-white h-[100%]">
      <h2 className="text-xl mb-4 text-white font-semibold">Friends List</h2>
      <div
        className="relative w-full h-full border border-neutral-800 bg-gradient-to-b from-[-100%] from-neutral-800 p-3 rounded-2xl bg-dark">
        {!isUserLoggedIn && (
          <div
            className="flex items-center justify-center absolute h-[100%] w-[100%] bg-gradient-to-b from-neutral-800 bg-dark rounded-2xl opacity-90 top-0 left-0">
            <p className="text-[1vw]">Sign in</p>
          </div>
        )}
        <div className=" items-center flex justify-between">
          <div className="flex gap-1 items-center">
            <p className="text-[1vw]">Fiends</p>
            <Dialog open={addFriendDialogOpen} onOpenChange={setAddFriendDialogOpen}>
              <DialogTrigger disabled={!isUserLoggedIn}>
                <div
                  className=" rounded-full items-center flex px-1.5 hover:cursor-pointer hover:opacity-70  border border-neutral-800 bg-gradient-to-b from-[-100%] from-neutral-600">
                  <p className="mx-auto my-auto">+</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <div
                  className="w-[470px] pt-[30px]"
                >
                  <p className="pb-10 ">Friend&apos;s email</p>
                  <input
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    type='text'
                    className="text-black indent-2 w-[100%] h-[30px] rounded-md"
                  />
                  <div
                    onClick={handleAddFriend}
                    className="cursor-pointer mt-[20px] hover:opacity-50  bg-gradient-primary items-center border border-line rounded-full flex gap-2 p-2 lg:p-5">
                    <div className="flex mx-auto items-center gap-2">
                      <p className="text-[1vw] xl:text-[1.1vw] 2xl:text-[1.2vw]">
                        Add
                      </p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-[0.8vw] text-center text-neutral-600 hover:text-neutral-400 hover:cursor-pointer">
            View Friends List
          </p>
        </div>
        <div className="h-[90%] xl:h-auto grid py-2 gap-4  overflow-auto">
          {friends.length
            ? friends.map((item) => (
              <>
                <div className="flex justify-between items-center xl:my-2 h-min">
                  {/* <div className="grid mt-2 gap-2 items-center 2xl:grid-cols-12 grid-cols-12 mr-2"> */}
                  <div className="xl:w-[45px] items-center xl:h-[45px] w-[30px] h-[30px] flex gap-2">
                    <Image
                      src={item.image}
                      width={48}
                      height={48}
                      alt={`News ${item.id}`}
                      className=" xl:w-[45px] items-center xl:h-[45px] w-[30px] h-[30px] flex gap-2 aspect-square rounded-xl"
                    />
                    <div className="grid text-[1vw] w-[10px]">
                      <p className=' text-[1.2vw]'>{item.name}</p>
                      <p className="opacity-50 flex w-36">ID: {item.id}</p>
                    </div>
                  </div>

                  <div className=" pl-8 items-center  flex gap-2">
                    {item.isOnline && (
                      <div
                        className="hover:cursor-pointer bg-green-400 rounded-full w-[1.4vw] h-[1.4vw] hover:opacity-60"></div>
                    )}

                    <div onClick={() => {
                    }}
                         className=" hover:cursor-pointer text-[1.5vw] hover:opacity-60 text-neutral-600  from-[-100%] from-neutral-800 items-center">
                      <IoChatbubble color="gray"/>
                    </div>
                  </div>
                </div>
              </>
            )) : (
              <div className="flex justify-between items-center xl:my-2 h-min">No friends yet</div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
