// src/components/CoinList.tsx
import React from 'react';
import CoinListItem from './CoinListItem';

const CoinList = ({ coins }) => {
  return (
    <div>
      {coins.map(coin => (
        <CoinListItem key={coin.id} coin={coin} />
      ))}
    </div>
  );
};

export default CoinList;
