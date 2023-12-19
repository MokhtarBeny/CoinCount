// src/components/CoinListItem.tsx
import React from 'react';

const CoinListItem = ({ coin }) => {
  return (
    <div>
      <span>{coin.name}</span>
      <span>{coin.price}</span>
      {/* ... Autres propriétés */}
    </div>
  );
};

export default CoinListItem;
