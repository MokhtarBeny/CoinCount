// src/pages/dashboard.tsx
import React, { useEffect, useState } from 'react';
import CoinList from '../components/CoinList';
import apiService from '../services/apiService';



const Dashboard = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    apiService.getCoins().then(data => {
      setCoins(data);
    });
  }, []);

  return <CoinList coins={coins} />;
};

export default Dashboard;
