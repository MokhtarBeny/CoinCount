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
        <div className="grid grid-cols-4">
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

  const handleShowAll = () => {
    setShowAll(true);
    setShowLess(false);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setShowLess(true);
  };

  return (
    <div>
      {renderArticles()}
      {articles.length > 4 && !showAll && (
        <Button
          onClick={handleShowAll}
          size="lg"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-6  border border-blue-500 hover:border-transparent rounded h-12 w-32"
        >
          Plus de résultats
        </Button>
      )}
      {showAll && (
        <Button
          onClick={handleShowLess}
          size="lg"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-6  border border-blue-500 hover:border-transparent rounded h-12 w-32"
        >
          Moins de résultats
        </Button>
      )}
    </div>
  );
};

export default ArticlesList;
