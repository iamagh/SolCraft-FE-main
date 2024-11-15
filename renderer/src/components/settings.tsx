import Image from "next/image";
import React, {useEffect} from "react";
import { useAuth } from "@/hooks/auth";

type ISettings = {
  onClose: () => void;
};

const Settings = ({ onClose }: ISettings) => {
  const wallet_state = "Disconnect Wallet";
  const theme_state = "Dark";
  const other_settings = "Lorem Ipsum";
  const { isUserLoggedIn, signout, signin } = useAuth();

  const handleLogin = () => {
    signin();
  };

  const handleLogout = () => {
    signout();
    onClose();
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <h2 className=" text-4xl font-semibold">Settings</h2>
      </div>
      <div className="my-10 gap-6 grid mx-auto text-center">
        <div className="">
          <p className="text-lg mb-4">Account</p>
          <div
            onClick={() => {
              if (isUserLoggedIn) {
                handleLogout();
              } else {
                handleLogin();
              }
            }}
            style={{ contain: "content" }}
            className="w-[470px] hover:cursor-pointer hover:opacity-80 h-[80px] items-center"
          >
            <Image
              src={"/button.svg"}
              className="absolute -z-10"
              alt=""
              width={1001}
              height={1001}
            />
            <p className="text-2xl font-semibold pt-[20px]">
              {isUserLoggedIn ? 'Logout' : 'Login with Microsoft'}
            </p>
          </div>
        </div>

        <div className={isUserLoggedIn ? "" : "opacity-50"}>
          <p className={`text-lg mb-4 `}>Wallet Settings</p>
          <div
            style={{ contain: "content" }}
            className={`w-[470px] hover:opacity-80 h-[80px] items-center ${isUserLoggedIn ? "hover:cursor-pointer" : "cursor-not-allowed"}`}
          >
            <Image
              src={"/button.svg"}
              className={`absolute -z-10`}
              alt=""
              width={1001}
              height={1001}
            />
            <p className="text-2xl font-semibold pt-[20px]">{wallet_state}</p>
          </div>
        </div>

        <div className={isUserLoggedIn ? "" : "opacity-50"}>
          <p className="text-lg mb-4">Other Settings</p>
          <div
            style={{ contain: "content" }}
            className={`${isUserLoggedIn ? "hover:cursor-pointer" : "cursor-not-allowed"} w-[470px] hover:opacity-80  h-[80px] items-center`}
          >
            <Image
              src={"/button.svg"}
              className="absolute -z-10 "
              alt=""
              width={1001}
              height={1001}
            />
            <p className="text-2xl font-semibold pt-[20px]">{other_settings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
