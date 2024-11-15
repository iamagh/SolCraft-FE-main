import React, {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import {MdKeyboardArrowDown} from "react-icons/md";
import axiosInstance from "@/lib/axiosInstance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceData {
  price: string;
  timestamp: number;
}

type ISelectiveCoin = {
  label: string;
  value: string;
}

type IAvailableCoins = {
  [key: string]: ISelectiveCoin
}

const availableCoins: IAvailableCoins = {
  SOL: {
    value: 'SOL',
    label:
      'Solana'
  },
  BTC: {
    value: 'BTC',
    label:
      'Bitcoin'
  }
}

type IPriceData = {
  price: string,
  timestamp: number
}

const PortfolioTracker: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
  const [selectedInterval, setSelectedInterval] = useState("1h");
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [selectedCoin, setSelectedCoin] = useState("SOL");

  useEffect(() => {
    axiosInstance.get(`/top-coins/price-data?symbol=${selectedCoin}USDT&interval=${selectedInterval}&period=30`)
      .then(({data}) => {

        const timestamps = data.map((item: IPriceData) => new Date(item.timestamp).toLocaleDateString('en-US'));
        const prices = data.map((item: IPriceData) => parseFloat(item.price));

        const initialPrice = prices[0];
        const latestPrice = prices[prices.length - 1];
        const change = ((latestPrice - initialPrice) / initialPrice) * 100;

        setCurrentPrice(latestPrice);
        setPriceChange(change);

        setChartData({
          labels: timestamps,
          datasets: [
            {
              label: "Price",
              data: prices,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: "rgba(75,192,192,0.2)",
              pointRadius: 0,
              tension: 0.1,
              borderWidth: 2,
            },
          ],
        });
      })

  }, [selectedInterval, selectedCoin]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          maxTicksLimit: 10,
          color: "#a1a1a1",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          color: "#a1a1a1",
          callback: function (value: string | number) {
            return `$${value}`;
          },
        },
      },
    },
    elements: {
      line: {
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        fill: 'start',
        backgroundColor: 'rgba(75,192,192,0.1)',
        tension: 0.4,
      },
    },
  };

  return (
    <div className="py-4 rounded-xl text-white h-[100%]">
      <h2 className="text-xl mb-4 font-semibold">Portfolio Tracker</h2>
      <div
        className="w-full h-full border overflow-auto border-neutral-800 bg-gradient-to-b from-[-100%] from-neutral-800 rounded-2xl bg-dark p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-bold">
                {availableCoins[selectedCoin].label} {availableCoins[selectedCoin].value}
              </h3>
              <div className="relative inline-block ml-1">
                <select
                  value={selectedCoin}
                  onChange={(e) => setSelectedCoin(e.target.value)}
                  className="bg-dark  bg-gradient-to-b from-[-100%] hover:cursor-pointer hover:opacity-80   from-neutral-800 text-transparent text-[0px] border border-neutral-800 rounded-full p-4 appearance-none"
                >
                  {Object.values(availableCoins).map(coin => (
                    <option key={coin.value} value={coin.value}>{coin.label}</option>
                  ))
                  }
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                  <MdKeyboardArrowDown size={16}/>
                </div>
              </div>
            </div>
            <p className="text-2xl font-bold">
              ${currentPrice?.toFixed(2)}
            </p>
            <p className={`text-lg ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange?.toFixed(2)}%
            </p>
          </div>

        </div>
        {chartData ? (
          <Line data={chartData} options={chartOptions}/>
        ) : (
          <p>Loading...</p>
        )}
        <div className="flex mx-2 mt-4 overflow-x-scroll">
          {[
            "1h",
            "2h",
            "4h",
            "6h",
            "8h",
            "12h",
            "1d",
            "3d",
            "1w",
            "1M"
          ].map((interval) => (
            <button
              key={interval}
              className={`mx-1 p-3 ${selectedInterval === interval ? 'rounded-xl items-center flex hover:cursor-pointer hover:opacity-70  border border-neutral-800 bg-gradient-to-b from-[-100%] from-neutral-600' : 'bg-dark'} rounded-xl`}
              onClick={() => setSelectedInterval(interval)}
            >
              {interval}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioTracker;
