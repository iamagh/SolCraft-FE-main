import React, { useEffect } from "react";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { IoIosLock } from "react-icons/io";

import { Dialog, DialogContent, DialogTrigger, } from "@/components/ui/dialog";
import ManageWallet from "./manage_wallet";
import { useAuth } from "@/hooks/auth";


const Navbar = () => {
  const { isUserLoggedIn, loading } = useAuth();

  return (
    <div className="text-white ">
      <div className=" py-6 h-[120px] px-6 w-[calc(100vw-106px)] items-center  justify-between grid grid-cols-12 gap-5">
        <div className="col-span-8 items-center  text-[1vw] border border-line rounded-full px-5 py-5">
          <p> Update 1.0: Lorem Ipsum Dolor lores unes on mesdium</p>
        </div>
        <div className="col-span-2 mx-auto flex">
          <Dialog>
            {loading
              ? <div
                className="w-[200px] hover:cursor-not-allowed hover:opacity-50  bg-gradient-primary items-center border border-line rounded-full flex gap-2 p-2 lg:p-5">
                <div className="flex mx-auto items-center gap-2">
                  <p className=" text-[1vw] xl:text-[1.1vw] 2xl:text-[1.2vw]">
                    Loading
                  </p>
                </div>
              </div>
              : isUserLoggedIn
                ? <DialogTrigger>
                  <div
                    className="w-[200px] hover:opacity-50  bg-gradient-primary items-center border border-line rounded-full flex gap-2 p-2 lg:p-5">
                    <div className="flex mx-auto items-center gap-2">
                      <IoIosLock size={24} />
                      <p className=" text-[1vw] xl:text-[1.1vw] 2xl:text-[1.2vw]">
                        Manage Wallet
                      </p>
                    </div>
                  </div>
                </DialogTrigger>
                : <div
                  className="w-[210px] hover:cursor-not-allowed hover:opacity-50  bg-gradient-primary items-center border border-line rounded-full flex gap-2 p-2 lg:p-5">
                  <div className="flex mx-auto items-center gap-2">
                    <p className=" text-[1vw] xl:text-[1.1vw] 2xl:text-[1.2vw]">
                      Sign in to use wallet
                    </p>
                  </div>
                </div>}
            <DialogContent>
              <ManageWallet />
            </DialogContent>
          </Dialog>
        </div>
        <button className="mx-auto flex">
          <div
            className="h-[70px] flex gap-1 bg-gradient-to-b from-[-100%] from-neutral-600 bg-dark hover:opacity-50 w-[70px] border border-line rounded-3xl items-center">
            <div className="flex items-center mx-auto w-[30px] xl:w-[40px] ">
              <Image
                className="flex mx-auto my-auto"
                src={"/navbar_mail.svg"}
                alt="logo"
                width={34}
                height={18}
              />
            </div>
          </div>
        </button>
        <button className=" ml-auto">
          <div
            className="h-[70px] bg-gradient-to-b mx-auto from-[-100%] from-neutral-600 bg-dark hover:opacity-50 w-[70px] border border-line rounded-3xl flex items-center">
            <div className="flex mx-auto w-[30px] xl:w-[40px] ">
              <MdClose size={100} color="white" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
