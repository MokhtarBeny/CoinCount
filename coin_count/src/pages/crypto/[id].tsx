import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchCryptoDataHistory, fetchSingleCryptoData } from '@/store/thunks/cryptoThunk';
import { selectCryptoHistory, selectSingleCrypto } from '@/store/slices/cryptoSlice';
import { AppDispatch, AppState } from '@/store/store';
import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";

export default function CryptoPage() {
     const router = useRouter();
     const { id } = router.query;
     const dispatch = useDispatch<AppDispatch>();
     const crypto = useSelector(selectSingleCrypto);
     const cryptoHistory = useSelector(selectCryptoHistory)
     const loading = useSelector((state: AppState) => state.crypto.loading);

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
               <h1>{crypto.name}</h1>
               <p>{JSON.stringify(crypto)}</p>
               <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
                    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                         <CardHeader className="absolute z-10 top-1 flex justify-between ">
                              <div><p className="text-tiny text-indigo-400 uppercase font-bold">{crypto.symbol}</p>
                                   <h4 className="text-black font-medium text-2xl">{crypto.name}</h4></div>

                              <div> <p className="text-tiny text-indigo-400 uppercase font-bold">Price USD</p>
                                   <h4 className="text-black font-medium text-2xl">{parseFloat(crypto.priceUsd).toFixed(2)}$</h4></div>
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
                    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
                         <CardHeader className="absolute z-10 top-1 flex-col items-start">
                              <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
                              <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
                         </CardHeader>
                         <CardBody>
                              <p></p>
                         </CardBody>
                         <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                              <div className="flex flex-grow gap-2 items-center">
                                   <Image
                                        alt="Breathing app icon"
                                        className="rounded-full w-10 h-11 bg-black"
                                        src="/images/breathing-app-icon.jpeg"
                                   />
                                   <div className="flex flex-col">
                                        <p className="text-tiny text-white/60">Breathing App</p>
                                        <p className="text-tiny text-white/60">Get a good night's sleep.</p>
                                   </div>
                              </div>
                              <Button radius="full" size="sm">Get App</Button>
                         </CardFooter>
                    </Card>
                    <Card className="col-span-12 sm:col-span-4 h-[300px]">
                         <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                              <p className="text-tiny text-white/60 uppercase font-bold">What to watch</p>
                              <h4 className="text-white font-medium text-large">Stream the Acme event</h4>
                         </CardHeader>
                         <Image
                              removeWrapper
                              alt="Card background"
                              className="z-0 w-full h-full object-cover"
                              src="/images/card-example-4.jpeg"
                         />
                    </Card>
                    <Card className="col-span-12 sm:col-span-4 h-[300px]">
                         <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                              <p className="text-tiny text-white/60 uppercase font-bold">Plant a tree</p>
                              <h4 className="text-white font-medium text-large">Contribute to the planet</h4>
                         </CardHeader>
                         <Image
                              removeWrapper
                              alt="Card background"
                              className="z-0 w-full h-full object-cover"
                              src="/images/card-example-3.jpeg"
                         />
                    </Card>
                    <Card className="col-span-12 sm:col-span-4 h-[300px]">
                         <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                              <p className="text-tiny text-white/60 uppercase font-bold">Supercharged</p>
                              <h4 className="text-white font-medium text-large">Creates beauty like a beast</h4>
                         </CardHeader>
                         <Image
                              removeWrapper
                              alt="Card background"
                              className="z-0 w-full h-full object-cover"
                              src="/images/card-example-2.jpeg"
                         />
                    </Card>
               </div>
               <p>{JSON.stringify(cryptoHistory)}</p>

          </>
     );
}
