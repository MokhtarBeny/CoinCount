import { useState } from "react";
import ArticlesList, { Article } from "./ArticleList";
import Category from "./Category";

interface CategorieProps {
  articles: Article[];
}

const FilterCategory: React.FC<CategorieProps> = ({ articles }) => {
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);

  const filterArticlesByCategory = (category: any) => {
    setSelectedCategory(category);
  };

  const filteredArticles = selectedCategory
    ? articles.filter((article) => article.category === selectedCategory)
    : articles;

  return (
    <div className="grid grid-cols-4 gap-2">
      {articles.map((article: Article, index: number) => (
        <div key={index} className="bg-white-100 mb-2 mx-2 rounded-md h-full">
          <Category
                  title={article.title}
                  author={article.author}
                  date={article.date}
                  image={article.image}
                  link={article.link} 
                  category={""}          />
        </div>
      ))}
      {/* Placer la section "Catégories" en dehors de la boucle de mappage */}
      <div>
        <h2>Catégories</h2>
        {/* Ajoutez ici votre composant Category global qui liste toutes les catégories */}
      </div>
    </div>
  );
};

export default FilterCategory;

  

