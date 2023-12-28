import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoData } from '../../store/thunks/cryptoThunk'; // Importing the thunk from the correct file
import { selectCrypto } from '../../store/slices/cryptoSlice'; // Importing the selector from the slice
import { AppDispatch } from '@/store/store';

function CryptoList() {
     const dispatch: AppDispatch = useDispatch();
     const { crypto, loading, error } = useSelector(selectCrypto);

     useEffect(() => {
          dispatch(fetchCryptoData());
     }, [dispatch]);

     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error loading data</p>;
     if (!crypto) return <p>No data available</p>;

     return (
          <div>
               {crypto.map((item: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; priceUsd: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
                    <div key={item.id}>
                         {item.name} - {item.priceUsd}
                    </div>
               ))}
          </div>
     );
}

export default CryptoList;
