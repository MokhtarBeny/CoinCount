// SmallCard.js
import article from '@/pages/article';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import React from 'react';

export default function SmallCard ({title, author, date, image, link}){

  const racourciTitre = (titre)=> {
    if ( titre.split(" ").length > 9)
    {
      return titre.split(" ").slice(0,9).join(" ") + "..."
    }

    return titre
  }
  return (
    <Card className="p-3">
      <a href={link}>
   <CardBody className="overflow-visible ">
      <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image}
          width={270}
        />
        <h4 className="font-bold text-large h-12 my-2">
          {racourciTitre(title)}
        </h4>
        <p className="text-tiny uppercase font-bold">
          {author}
        </p>
        <small className="text-default-500">
          {date}
        </small>
      </CardBody>
      </a>
    </Card>
  );
};

