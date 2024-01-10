import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import RssCard from "@/components/rss_feed/RssCard";
import axiosInstance from "@/utils/axios/axiosConfig";
import SmallCard from "@/components/SmallRssCard";
import ArticlesList from "@/components/rss_feed/ArticleList";
import Categorie from "@/components/rss_feed/Category";
import FilterCategory from "@/components/rss_feed/FilterArticleList";
import FilterArticleList from "@/components/rss_feed/FilterArticleList";

interface Categories {
  categories: string[];
}

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchRSSFeed = async () => {
    try {
      const response = await axiosInstance.get("articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du flux RSS", error);
      throw error;
    }
  };
  const getAvailableCryptoCategories = () => {
    try {
      axiosInstance
        .get("/cryptos")
        .then((response) => {
          const results = response.data;
          const categories: string[] = results.map((result: any) => result.id);
          const uniqueCategories = [...new Set(categories)];
          setCategories(uniqueCategories);
        })
        .catch((error) => {
          console.error("Error fetching crypto data:", error);
        });
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    getAvailableCryptoCategories();
    fetchRSSFeed();
  }, []);

  return (
    <div className="container mx-auto">
      <div className=" p-5">
        <p className="text-2xl uppercase font-bold mb-3 text-black">
          Tendances du moment
        </p>
        <div className="bg-white-500 flex flex-row gap-4">
          <div className="bg-white-400 w-1/2 py-3  ">
            {articles.length > 0 && (
              <>
                <RssCard
                  key={articles[0].title}
                  title={articles[0].title}
                  description={articles[0].description}
                  author={articles[0].author}
                  date={articles[0].date}
                  image={articles[0].image}
                  link={articles[0].link}
                />
              </>
            )}
          </div>
          <div className="bg-white-400 w-1/2 py-3  ">
            {articles.length > 0 && (
              <>
                <RssCard
                  key={articles[1].title}
                  title={articles[1].title}
                  description={articles[1].description}
                  author={articles[1].author}
                  date={articles[1].date}
                  image={articles[1].image}
                  link={articles[1].link}
                />
              </>
            )}
          </div>
        </div>
        <div className="bg-white-400">
          <ArticlesList articles={articles.slice(2)} />
        </div>
      </div>
    </div>
  );
};

export default Articles;
