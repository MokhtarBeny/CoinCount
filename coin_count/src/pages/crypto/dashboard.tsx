// src/pages/dashboard.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios/axiosConfig";
import { EyeFilled, StarFilled, StarOutlined } from "@ant-design/icons";
import { Sparklines, SparklinesLine } from 'react-sparklines';

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
  import Link from "next/link";

const DashboardPage: React.FC = () => {
  const [coins, setCoins] = useState([]);
  const { token } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [canReqFav, setCanReqFav] = useState(true);


  const generateTrendData = (changePercent: number, length = 5) => {
    let trendData = [50];
    for (let i = 1; i < length; i++) {
      trendData.push(
        trendData[i - 1] + (changePercent > 0 ? 1 : -1) * Math.random() * 10
      );
    }
    return trendData;
  };

  const addToWatchList = async (coin: any) => {
    if(token  === "" || token === null) {
      if(!canReqFav) return;
      toast.info("Please login to add to watchlist");
      setCanReqFav(false);
      setTimeout(() => {
        setCanReqFav(true);
      }, 5000);
      return;
    }
    console.log(coin);
    try {
      const response = await axiosInstance.get(
        "/auth/watchlist/" + coin._id,
        coin._id
      );
      if (response.status === 200) {
        setWatchlist(response.data.user.watchlist);
        toast.success("Ajouté à la watchlist");
      }
    } catch (error) {
      toast.error("Erreur lors de l'ajout à la watchlist");
    }
  };

  const removeFromWatchlist = async (coin: any) => {
    try {
      const response = await axiosInstance.delete(
        "/auth/watchlist/" + coin._id,
        coin._id
      );
      if (response.status === 200) {
        setWatchlist(response.data.user.watchlist);
        toast.success("Retiré de la watchlist");
      }
    } catch (error) {
      toast.error("Erreur lors du retrait de la watchlist");
    }
  }
  

  useEffect(() => {
    axiosInstance
      .get("/cryptos")
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => {
        console.error("Error fetching crypto data:", error);
      });
  }, []);

  const formatChangePercent = (percent: string) => {
    const change = parseFloat(percent);
    const className = change < 0 ? "text-red-500" : "text-green-500";
    return <span className={className}>{change.toFixed(2)}%</span>;
  };

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axiosInstance.get("/auth/watchlist");
        setWatchlist(response.data);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };
    fetchWatchlist();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">
            Tableau de bord des cryptomonnaies
          </h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col">
          {/* Ici, vous pouvez ajouter des boutons de filtrage ou de tri si nécessaire */}
        </div>
        <div className="inline-block min-w-full shadow rounded-lg overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Coin
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  24h
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Volume sur 24h en $
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Market Cap
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sparkline
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Favorite
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  View
                </th>
                {/* ... autres en-têtes de colonnes comme 1h, 7d, etc ... */}
              </tr>
            </thead>
            <tbody>
              {coins.map((coin, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {coin.rank}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap font-bold">
                          {" "}
                          {/* Nom de la cryptomonnaie en gras */}
                          {coin.name} {coin.symbol}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      ${parseFloat(coin.priceUsd).toFixed(2)}{" "}
                      {/* Prix avec deux décimales */}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {formatChangePercent(coin.changePercent24Hr)}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      ${parseInt(coin.volumeUsd24Hr).toLocaleString()}{" "}
                      {/* Volume avec séparateurs de milliers */}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      ${parseInt(coin.marketCapUsd).toLocaleString()}{" "}
                      {/* Market Cap avec séparateurs de milliers */}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <Sparklines data={generateTrendData(coin.changePercent24Hr)} height={20} width={100}>
                      <SparklinesLine color={coin.changePercent24Hr >= 0 ? "green" : "red"} />
                    </Sparklines>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-large">
                    {watchlist.find((c) => c === coin._id) ? (
                      <button
                        className="btn btn-primary px-3 "
                        onClick={() => removeFromWatchlist(coin)}
                      >
                        <StarFilled className="text-yellow-500" />
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary px-3 "
                        onClick={() => addToWatchList(coin)}
                      >
                        <StarOutlined className="text-yellow-500" />
                      </button>
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-large">
                    
                    <Link href={`/crypto/${coin.id}`}
                      className="btn btn-primary px-3">
                        <EyeFilled />
                      </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
