// ArticlesList.js
import React, { useState } from 'react';
import { Card, Image, Button } from '@nextui-org/react';
import SmallCard from '@/components/SmallRssCard';

const ArticlesList = ({ articles }) => {
  const [showAll, setShowAll] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const renderArticles = () => {
    if (showAll) {
      return (
        <div className="grid grid-cols-2 gap-2">
        {articles.map((article, index) => (
          <div key={article + index} className="bg-white-100 p-4 rounded-md h-full">
            <SmallCard title={article.title} author={article.author} date={article.date} image={article.image} />
          </div>
        ))}
      </div>
    );
  } else {
    const displayedArticles = showLess ? articles.slice(0, 4) : articles;

    return (
      <div className="grid grid-cols-2 gap-2">
        {displayedArticles.map((article, index) => (
          <div key={article + index} className="bg-white-100 p-4 rounded-md h-full">
            <SmallCard title={article.title} author={article.author} date={article.date} image={article.image} />
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
      <Button onClick={handleShowAll} size="small">
        Plus de résultats
      </Button>
    )}
    {showAll && (
      <Button onClick={handleShowLess} size="small">
        Moins de résultats
      </Button>
    )}
  </div>
);
};

export default ArticlesList;