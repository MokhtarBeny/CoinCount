import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import RssCard from '@/components/rss_feed/RssCard';
import axiosInstance from '@/utils/axios/axiosConfig';
import SmallCard from '@/components/SmallRssCard';
import ArticlesList from '@/components/rss_feed/ArticleList';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const fetchRSSFeed = async () => {
    try {
      const response = await axiosInstance.get('articles');
      setArticles(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération du flux RSS', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchRSSFeed();
  }, []);

  return (
    <div className="crypto p-5 bg-white">
      <p className="text-2xl uppercase font-bold mb-3 text-black">Dernières actualités de Bitcoin</p>
      <div className="bg-white-500 flex flex-row space-y-2">
        <div className="bg-white-400 w-1/2 p-2">
          {/* {articles.length > 0 && (
            <RssCard
              key={articles[0].title}
              title={articles[0].title}
              description={articles[0].description}
              author={articles[0].author}
              date={articles[0].date}
              image={articles[0].image}
            />
          )} */}
        </div>
        <div className="bg-white-400 w-1/2 p-2">
        {/* <ArticlesList articles={articles} /> */}
        </div>
      </div>
    </div>
  );
};

export default Articles;
