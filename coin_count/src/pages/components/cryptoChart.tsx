import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import {
     Chart as ChartJS,
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Filler,
     Legend,
} from 'chart.js';
import type { ChartData } from 'chart.js';
import { ICryptoHistoryData } from '@/utils/interface/cryptosInterface';
import { Tab, Tabs } from '@nextui-org/react';

ChartJS.register(
     CategoryScale,
     LinearScale,
     PointElement,
     LineElement,
     Title,
     Tooltip,
     Filler,
     Legend
);

interface ICryptoChartProps {
     cryptoHistoryData: ICryptoHistoryData[]
}

const initialChartData: ChartData<'line'> = {
     labels: [],
     datasets: [{
          label: 'Price in USD',
          data: [],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
     }],
};

export default function CryptoChart({ cryptoHistoryData }: ICryptoChartProps) {
     console.log(cryptoHistoryData)
     const [timeFilter, setTimeFilter] = useState('1M');
     const [filteredData, setFilteredData] = useState<ChartData<'line'>>(initialChartData);

     const processData = (data: any[], filter: string) => {
          const now = moment();
          return data.filter(item => {
               let timeDiff;
               switch (filter) {
                    case '1d':
                         timeDiff = now.diff(moment(item.time), 'days');
                         break;
                    case '1w':
                         timeDiff = now.diff(moment(item.time), 'weeks');
                         break;
                    case '1M':
                         timeDiff = now.diff(moment(item.time), 'months');
                         break;
                    default:
                         timeDiff = now.diff(moment(item.time), 'days');
               }
               return timeDiff < 1;
          }).map(item => {
               let format;
               switch (filter) {
                    case '1d':
                         // For 1 day, show hour
                         format = 'HH:mm';
                         break;
                    case '1w':
                         // For 1 week, show day and hour
                         format = 'MMM DD HH:mm';
                         break;
                    case '1M':
                         // For 1 month, show day
                         format = 'MMM DD';
                         break;
                    default:
                         format = 'HH:mm';
               }
               return {
                    time: moment(item.time).format(format),
                    priceUsd: parseFloat(item.priceUsd)
               };
          });
     };

     const options = {
          responsive: true,
          plugins: {
               legend: {
                    position: 'top' as const,
               },
               title: {
                    display: true,
                    text: 'Crypto Price History ' + [moment().format('YYYY-MM-DD')],
               },
          },
     };

     useEffect(() => {
          if (cryptoHistoryData) {
               const processedData = processData(cryptoHistoryData, timeFilter);
               setFilteredData({
                    labels: processedData.map(item => item.time),
                    datasets: [{
                         label: 'Price in USD',
                         data: processedData.map(item => item.priceUsd),
                         borderColor: 'rgb(53, 162, 235)',
                         backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    }],
               });
          }
     }, [cryptoHistoryData, timeFilter]);


     return (
          <div>
               <Line options={options} data={filteredData} />
               <div>
                    <Tabs key="filter" color="secondary" aria-label="Chart Filter" radius="full">
                         <Tab onClick={() => setTimeFilter('1M')} key="1M" title={<button onClick={() => setTimeFilter('1M')}>1 Month</button>} />
                         <Tab onClick={() => setTimeFilter('1w')} key="1w" title={<button onClick={() => setTimeFilter('1w')}>1 Week</button>} />
                         <Tab onClick={() => setTimeFilter('1d')} key="1d" title={<button onClick={() => setTimeFilter('1d')}>1 Day</button>} />
                    </Tabs>
               </div>
          </div>
     );
}
