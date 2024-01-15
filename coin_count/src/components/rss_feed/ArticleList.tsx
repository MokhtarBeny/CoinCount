// ArticlesList.js
import React, { useState } from "react";
import { Card, Image, Button } from "@nextui-org/react";
import SmallCard from "@/components/SmallRssCard";

export interface Article {
  title: string;
  author: string;
  date: string;
  image: string;
  link?: string;
  category: string; // Ajoutez la propriété category si elle n'est pas déjà présente
}
const ArticlesList: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const [showAll, setShowAll] = useState(true);
  const [showLess, setShowLess] = useState(false);
  const renderArticles = () => {
    if (showAll) {
      return (
        <div className="grid sm:grid-cols-4 grid-cols-1">
          {articles.map((article: Article, index: number) => (
            <div
              key={`${article}${index}`}
              className="bg-white-100 mb-2 mx-2 rounded-md h-full"
            >
              <SmallCard
                title={article.title}
                author={article.author}
                date={article.date}
                image={article.image}
                link={article.link}
              />
            </div>
          ))}
        </div>
      );
    } else {
      const displayedArticles = showLess ? articles.slice(0, 4) : articles;

      return (
        <div className="grid grid-cols-4">
          {displayedArticles.map((article: Article, index: number) => (
            <div
              key={`${article}${index}`}
              className="bg-white-100 mb-2 mx-2 rounded-md h-full"
            >
              <SmallCard
                title={article.title}
                author={article.author}
                date={article.date}
                image={article.image}
                link={article.link}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  
  return (
    <div>
      {renderArticles()}
    </div>
  );
};

export default ArticlesList;
