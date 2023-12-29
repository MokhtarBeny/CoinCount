import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchCryptoDataHistory, fetchSingleCryptoData } from '@/store/thunks/cryptoThunk';
import { selectCryptoHistory, selectSingleCrypto } from '@/store/slices/cryptoSlice';
import { AppDispatch, AppState } from '@/store/store';
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import CryptoChart from '../components/cryptoChart';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

export default function CryptoPage() {
     const router = useRouter();
     const { id } = router.query;
     const dispatch = useDispatch<AppDispatch>();
     const crypto = useSelector(selectSingleCrypto);
     const cryptoHistory = useSelector(selectCryptoHistory)
     const loading = useSelector((state: AppState) => state.crypto.loading);

     type ChangeIndicatorProps = {
          changePercent24Hr: number;
     };


     const ChangeIndicator: React.FC<ChangeIndicatorProps> = ({ changePercent24Hr }) => {
          const isPositive = changePercent24Hr > 0;
          return isPositive ? <CaretUpOutlined className="text-green-500" /> : <CaretDownOutlined className="text-red-500" />;
     };



     useEffect(() => {
          if (id) {
               dispatch(fetchSingleCryptoData(id.toString()));
               dispatch(fetchCryptoDataHistory(id.toString()));

          }
     }, [dispatch, id]);


     if (router.isFallback || loading) {
          return <div>Loading...</div>;
     }

     if (!crypto) {
          return <div>No data available</div>;
     }

     return (
          <>
               <div className="  gap-2 grid grid-cols-12 grid-rows-2 px-8">
                    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                         <CardHeader className="absolute z-10 top-1 flex justify-between ">
                              <div><p className="text-tiny text-indigo-400 uppercase font-bold">{crypto.symbol}</p>
                                   <h4 className="text-black font-medium text-2xl">{crypto.name}</h4></div>

                              <div> <p className="text-tiny text-indigo-400 uppercase font-bold">Price USD</p>
                                   <h4 className="text-black font-medium text-2xl">{parseFloat(crypto.priceUsd).toFixed(2)}$</h4>
                                   <p className="text-tiny text-indigo-400 uppercase font-bold">Change 24h</p>
                                   <h4 className={`font-medium text-lg ${parseFloat(crypto.changePercent24Hr) > 0 ? 'text-green-500' : 'text-red-500'}`}>{parseFloat(crypto.changePercent24Hr).toFixed(2)}%  <ChangeIndicator changePercent24Hr={crypto.changePercent24Hr} /></h4></div>
                         </CardHeader>
                         <CardBody className='justify-center items-center'>
                              <h4 className='text-indigo-800 font-bold text-2xl'>{crypto.rank}</h4>
                              <h4 className='text-indigo-500 font-semibold text-2xl'>Rank</h4>
                         </CardBody>
                         <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                              <Button className="text-tiny" color="secondary" variant='ghost' radius="full" size="sm">
                                   <a href={crypto.explorer}>
                                        Website
                                   </a>
                              </Button>
                              <Button className="text-tiny" color="primary" radius="full" size="sm">
                                   <a href={crypto.explorer}>
                                        Explorer
                                   </a>
                              </Button>
                         </CardFooter>
                    </Card>
                    <Card isFooterBlurred className="col-span-12 row-span-2 sm:col-span-7">
                         <CardBody>
                              <CryptoChart cryptoHistoryData={cryptoHistory} />
                         </CardBody>
                    </Card>
                    <Card className="col-span-12 sm:col-span-5 h-full  items-center  justify-center content-center flex flex-row ">
                         <CardBody className='flex'><p className="text-tin text-indigo-400 font-bold">Volume (24h)</p>
                              <h4 className=" font-medium text-large">{parseFloat(crypto.volumeUsd24Hr).toFixed(2)}$</h4>
                              <p className="text-tin  font-bold text-indigo-400">VWap 24h</p>
                              <h4 className=" font-medium text-large">{parseFloat(crypto.vwap24Hr).toFixed(2)}$</h4>

                         </CardBody>
                         <CardBody className='flex '>
                              <div className=''> <p className="text-tin  font-bold text-indigo-400">Market Cap</p>
                                   <h4 className=" font-medium text-large ">{parseFloat(crypto.marketCapUsd).toFixed(2)}$</h4>
                                   <p className="text-tin  font-bold text-indigo-400">Supply</p>
                                   <h4 className=" font-medium text-large">{parseFloat(crypto.supply)} {crypto.symbol}</h4></div>

                         </CardBody>
                    </Card>
               </div>


          </>
     );
}
