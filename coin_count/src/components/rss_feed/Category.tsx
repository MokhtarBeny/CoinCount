// Categorie.tsx
import React from 'react';
import { Card, CardBody, Image } from "@nextui-org/react";
import { Article } from '@/components/rss_feed/ArticleList'; // Importez le type Article

const Category: React.FC<Article> = ({ title, author, date, image, link }) => {
  const racourciTitre = (titre: string) => {
    if (titre.split(" ").length > 8) {
      return titre.split(" ").slice(0, 8).join(" ") + "..."
    }

    return titre;
  };

  return (
    <Card className="p-3">
      <a href={link}>
        <CardBody className="flex bg-white">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={image}
            width={270}
          />
          <div className="ml-4"> {/* Ajout de la marge à gauche pour séparer le texte de l'image */}
            <h4 className="font-bold text-large h-12 my-2">
              {racourciTitre(title)}
            </h4>
            <p className="text-tiny uppercase font-bold">
              {author}
            </p>
            <small className="text-default-500">
              {date}
            </small>
          </div>
        </CardBody>
      </a>
    </Card>
  );
};

export default Category;
