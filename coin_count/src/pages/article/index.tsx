import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import RssCard from '@/components/rss_feed/RssCard';
import axiosInstance from '@/utils/axios/axiosConfig';
import SmallCard from '@/components/SmallRssCard';
import ArticlesList from '@/components/rss_feed/ArticleList';
import Categorie from '@/components/rss_feed/Category';
import FilterCategory from '@/components/rss_feed/FilterArticleList';
import FilterArticleList from '@/components/rss_feed/FilterArticleList';

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
      <p className="text-2xl uppercase font-bold mb-3 text-black">Dernières actualités</p>
      <div className="bg-white-500 flex flex-row ">
        <div className="bg-white-400 w-1/2 p-3 ">
          {articles.length > 0 && (
            <RssCard
              key={articles[0].title}
              title={articles[0].title}
              description={articles[0].description}
              author={articles[0].author}
              date={articles[0].date}
              image={articles[0].image}
              link ={articles[0].link}
            />
          )}
        </div>
        <div className="bg-white-400 w-1/2 p-3">
        <ArticlesList articles={articles} />
        </div>
      </div>
{/* Afficher les colonnes de catégories avec FilterArticleList */}
      <div className="crypto p-5 bg-white">
        <p className="text-2xl uppercase font-bold mb-3 text-black"> Catégories</p>
        <FilterArticleList articles={articles} />
      </div>
    </div>
  );
};

export default Articles;
