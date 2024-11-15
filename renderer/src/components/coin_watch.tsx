import Image from "next/image";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/hooks/auth";
import axiosInstance from "@/lib/axiosInstance";

const CoinWatchList = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [solData, setSolData] = useState<any>(null);
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetWalletData =() => {
    setLoading(true);
    axiosInstance.get('/wallet/data')
      .then(({data}) => {
        setSolData({
          amount: data.sol,
          valueInUSD: data.solValueInUSD
        })
        setAddress(data.address);
        setCoinData(data.tokens);
      })
      .catch(() => {
        console.log('something went wrong')
      })
      .finally(() => {
        setLoading(false);
      })
  };

  useEffect(() => {
    handleGetWalletData();
  }, []);

  const { isUserLoggedIn } = useAuth();

  const sumTokenAmounts = (data: any) => {
    return data.reduce((total: number, token: any) => total + token.amount, 0);
  }

  return (
    <div className="py-4 rounded-xl text-white h-[100%]">
      <h2 className="text-xl mb-4 text-white font-semibold">Coin Watch List</h2>
      <div className="relative w-full h-full border border-neutral-800 bg-gradient-to-b from-[-100%] overflow-auto from-neutral-800 rounded-2xl bg-dark p-4">
        {!isUserLoggedIn && (
          <div
            className="flex items-center justify-center absolute h-[100%] w-[100%] bg-gradient-to-b from-neutral-800 bg-dark rounded-2xl top-0 left-0">
            <p className="text-[1vw]">Sign in</p>
          </div>
        )}
        {loading && (
          <div
            className="flex items-center justify-center absolute h-[100%] w-[100%] bg-gradient-to-b from-neutral-800 bg-dark rounded-2xl top-0 left-0">
            <p className="text-[1vw]">Loading</p>
          </div>
        )}
        <div className="flex flex-col items-center">
          <div className="flex rounded-full hover:cursor-pointer hover:opacity-70  border border-neutral-700 bg-gradient-to-b pr-2  from-[-100%] from-neutral-800 items-center mb-4">
            <div className="rounded-full  p-2 mr-2">
              <Image
                src="/solana.svg" // Replace with the actual image path
                alt="Solana"
                width={32}
                height={32}
              />
            </div>
            <span className="text-lg font-semibold">{`${address?.slice(0, 7)}...${address?.slice(-3)}`}</span>
          </div>
          <div className="text-4xl font-bold mb-2">${(solData?.amount + sumTokenAmounts(coinData)).toFixed(2)}</div>
          {/*<div className="text-green-500 text-xl">+12.84%</div>*/}
        </div>
        <div className="mt-4">
          {solData && <div
            className="flex rounded-xl p-2 hover:cursor-pointer justify-between hover:opacity-70  border border-neutral-700 bg-gradient-to-b pr-2  from-[-100%] from-neutral-800 items-center mb-4"
          >
            <div className="flex items-center">
              <Image
                src={"/solana.svg"}
                alt={'Solana'}
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
              <div>
                <div className="text-lg font-semibold">Solana</div>
                <div className="text-gray-400 text-sm">
                  {solData.amount} SOL
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">${solData.valueInUSD.toFixed(2)}</div>
              {/*<div className={`text-sm ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>*/}
              {/*  {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}*/}
              {/*</div>*/}
            </div>
          </div>}
          {coinData.length ? coinData.map((coin: any) => (
            <div
              key={coin.mint}
              className="flex rounded-xl p-2 hover:cursor-pointer justify-between hover:opacity-70  border border-neutral-700 bg-gradient-to-b pr-2  from-[-100%] from-neutral-800 items-center mb-4"
            >
              <div className="flex items-center">
                <Image
                  src={coin.logo}
                  alt={coin.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                <div>
                  <div className="text-lg font-semibold">{coin.name}</div>
                  <div className="text-gray-400 text-sm">
                    {coin.amount} {coin.symbol}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">${coin.valueInUSD.toFixed(2)}</div>
                {/*<div className={`text-sm ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>*/}
                {/*  {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}*/}
                {/*</div>*/}
              </div>
            </div>
          )) : null}
        </div>
      </div>
    </div>
  );
};

export default CoinWatchList;
