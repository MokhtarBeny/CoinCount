// src/pages/dashboard.tsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axios/axiosConfig';


const DashboardPage: React.FC = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axiosInstance.get('/cryptos').then((response) => {
      setCoins(response.data);
    }).catch((error) => {
      console.error("Error fetching crypto data:", error);
    });
  }, []);

  // Formate le pourcentage et détermine la classe de couleur
  const formatChangePercent = (percent: string) => {
    const change = parseFloat(percent);
    const className =
      change < 0 ? 'text-red-500' : 'text-green-500';
    return (
      <span className={className}>
        {change.toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Tableau de bord des cryptomonnaies</h2>
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
                        <p className="text-gray-900 whitespace-no-wrap font-bold"> {/* Nom de la cryptomonnaie en gras */}
                          {coin.name} {coin.symbol}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      ${parseFloat(coin.priceUsd).toFixed(2)} {/* Prix avec deux décimales */}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {formatChangePercent(coin.changePercent24Hr)}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      ${parseInt(coin.volumeUsd24Hr).toLocaleString()} {/* Volume avec séparateurs de milliers */}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      ${parseInt(coin.marketCapUsd).toLocaleString()} {/* Market Cap avec séparateurs de milliers */}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      sparkline to do 
                    </p>
                  </td>
                  {/* ... autres cellules pour les données de 1h, 7d, etc ... */}
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
