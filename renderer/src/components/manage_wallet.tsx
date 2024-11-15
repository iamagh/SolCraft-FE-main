import React, {useEffect, useState} from "react";
import Image from "next/image";
import { IoIosLock } from "react-icons/io";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import axiosInstance from "@/lib/axiosInstance";


const ManageWallet = () => {
  const [isCreateWalletOpen, setCreateWalletOpen] = useState(false);
  const [privateKey, setPrivateKey] = useState("");
  const [walletName, setWalletName] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleImportWallet = () => {
    debugger
    axiosInstance.post('/wallet/import', {
      privateKey,
      name: walletName,
    })
      .then()
      .catch(() => {
        console.log('something went wrong')
      })
  };

  const handleCreateWallet = () => {
    axiosInstance.post('/wallet/generate', {
      name: walletName
    })
      .then(({data}) => {
        setMnemonic(data.mnemonic);
      })
      .catch(() => {
        console.log('something went wrong')
      })
  };

  const handleGetWallet =() => {
    setLoading(true);
    axiosInstance.get('/wallet')
      .then(({data}) => {
        setWallet(data);
      })
      .catch(() => {
        console.log('something went wrong')
      })
      .finally(() => {
        setLoading(false);
      })
  };

  useEffect(() => {
    handleGetWallet();

    return () => {
      setWallet(null);
    }
  }, []);

  return (
    <div className="my-20">
      <div className="">
        <h2 className="text-3xl font-semibold">Welcome to SOLcraft</h2>
        <p className=" text-xl text-neutral-700 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec
          tellus at nisl cursus auctor eget a dolor.{" "}
        </p>
      </div>
      {loading ? (
        <div className=" text-center grid gap-6 my-10">
          Loading
        </div>
      ) : wallet ? (
        <div className=" text-center grid gap-6 my-10">
          <p className="pt-[20px]">{wallet.name}</p>
          <p className="pt-[20px]">{wallet.address}</p>
        </div>
      ) : (
        <div className=" text-center grid gap-6 my-10">
          <Dialog>
            <DialogTrigger>
              <div
                onClick={() => {
                }}
                className="w-[470px] hover:opacity-60 hover:cursor-pointer items-center text-2xl h-[80px] border border-neutral-800 bg-gradient-to-b from-[-100%] from-neutral-800 rounded-full bg-dark"
              >
                <p className="pt-[20px]">Import Wallet</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <div
                className="w-[470px] pt-[30px]"
              >
                <p className="pb-10 ">Please enter your private key and name for wallet</p>
                <input
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                  placeholder='Wallet name'
                  type='text'
                  className="mb-10 text-black indent-2 w-[100%] h-[30px] rounded-md"
                />
                <input
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  type='text'
                  placeholder='Private key'
                  className="text-black indent-2 w-[100%] h-[30px] rounded-md"
                />
                <div
                  onClick={handleImportWallet}
                  className="cursor-pointer mt-[20px] hover:opacity-50  bg-gradient-primary items-center border border-line rounded-full flex gap-2 p-2 lg:p-5">
                  <div className="flex mx-auto items-center gap-2">
                    <p className="text-[1vw] xl:text-[1.1vw] 2xl:text-[1.2vw]">
                      Import
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isCreateWalletOpen} onOpenChange={setCreateWalletOpen}>
            <div
              style={{contain: "content"}}
              className="w-[470px] mx-auto rounded-2xl justify-center hover:cursor-pointer hover:opacity-80 h-[80px] items-center"
              onClick={() => setCreateWalletOpen(true)}
            >
              <Image
                src={"/button.svg"}
                className="absolute -z-10"
                alt=""
                width={1001}
                height={1001}
              ></Image>
              <div className=" items-center flex gap-2 justify-center mx-auto pt-[20px]">
                <IoIosLock size={28}/>
                <p className="text-2xl pt-[2px]">Create Wallet</p>
              </div>
            </div>
            <DialogContent>
              <div
                className="w-[470px] pt-[30px]"
              >
                <p className="pb-10 ">Please choose a name for you wallet</p>
                <input
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                  type='text'
                  className="text-black indent-2 w-[100%] h-[30px] rounded-md"
                />
                <div
                  onClick={handleCreateWallet}
                  className="cursor-pointer mt-[20px] hover:opacity-50  bg-gradient-primary items-center border border-line rounded-full flex gap-2 p-2 lg:p-5">
                  <div className="flex mx-auto items-center gap-2">
                    <p className="text-[1vw] xl:text-[1.1vw] 2xl:text-[1.2vw]">
                      Create
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={!!mnemonic} onOpenChange={(open) => open ? null : setMnemonic('')}>
            <DialogContent>
              <div
                className="w-[470px] pt-[30px]"
              >
                <p className="pb-10 ">Please store somewhere safe and close the dialog</p>
                <p className="pb-10 text-center">{mnemonic}</p>
                <div
                  onClick={() => {
                    setMnemonic("");
                    setCreateWalletOpen(false);
                  }}
                  className="cursor-pointer mt-[20px] hover:opacity-50  bg-gradient-primary items-center border border-line rounded-full flex gap-2 p-2 lg:p-5">
                  <div className="flex mx-auto items-center gap-2">
                    <p className="text-[1vw] xl:text-[1.1vw] 2xl:text-[1.2vw]">
                      Done
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default ManageWallet;
