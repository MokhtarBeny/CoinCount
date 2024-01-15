import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    if (allSelected) {
      setSelectedCategories(categories);
      setFilteredArticles(articles);
      setAllSelected(false);
    }
    if (selectedCategories.length > 0) {
      const newFilteredArticles = articles.filter((article) =>
        article.categories.some((category) =>
          selectedCategories.some((selectedCategory) =>
            category.toLowerCase().includes(selectedCategory.toLowerCase())
          )
        )
      );
      setFilteredArticles(newFilteredArticles);
    } else {
      setFilteredArticles(articles);
    }
  }, [articles, selectedCategories]);

  const fetchRSSFeed = async () => {
    try {
      const response = await axiosInstance.get("articles");
      setArticles(response.data);
      console.log(response.data);
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
          console.log(uniqueCategories);
        })
        .catch((error) => {
          console.error("Error fetching crypto data:", error);
        });
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  const selectAllArticles = () => {
    setFilteredArticles(articles);
  };

  useEffect(() => {
    getAvailableCryptoCategories();
    fetchRSSFeed();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-row gap-4">
        <div className="flex-1 flex nowrap overflow-scroll custom-scrollbar py-2">
          {selectedCategories.length > 0 && (
            <Chip
              color="warning"
              variant="solid"
              className="mr-2 cursor-pointer"
              onClose={() => {
                setSelectedCategories([]);
              }}
              onClick={() => {
                setSelectedCategories([]);
              }}
            >
              No Filter
            </Chip>
          )}
          {categories.length > 0 &&
            categories.map((category: string, index: number) => {
              if (selectedCategories.includes(category)) {
                return (
                  <Chip
                    key={index}
                    color="primary"
                    variant="solid"
                    className="mr-2 cursor-pointer"
                    onClick={() => {
                      setSelectedCategories(
                        selectedCategories.filter(
                          (selectedCategory: string) =>
                            selectedCategory !== category
                        )
                      );
                    }}
                  >
                    {category}
                  </Chip>
                );
              }
              return (
                <Chip
                  key={index}
                  color="primary"
                  variant="bordered"
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    setSelectedCategories([...selectedCategories, category]);
                  }}
                >
                  {category}
                </Chip>
              );
            })}
        </div>
      </div>

      <div className=" p-5">
        {filteredArticles.length == 0 ? (
          <p className="uppercase font-bold mb-3 text-black">
            No articles found...
          </p>
        ) : (
          <div className="flex justify-between align-center">

          <p className="text-2xl uppercase font-bold mb-3 text-black ">
            
            Trending 
          </p>
          <span className="text-muted">
            {
              filteredArticles.length
            }
            {filteredArticles.length > 1 ? " articles" : " article"}
            {" "}
            Found
          </span>
          </div>
        )}

        <div className="bg-white-500 flex flex-row gap-4">
          <div className="bg-white-400 w-1/2 py-3  ">
            {filteredArticles.length > 0 && (
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
            {filteredArticles.length > 0 && (
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
          <ArticlesList articles={filteredArticles} />
        </div>
      </div>
    </div>
  );
};

export default Articles;
