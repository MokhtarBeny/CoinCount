// SmallCard.js
import article from '@/pages/article';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import React from 'react';

export default function SmallCard ({title, description, author, date, image}){
  return (
    <Card className="py-4 ">
   <CardBody className="overflow-visible py-2 p-4">
      <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image}
          width={270}
        />
        <h4 className="font-bold text-large">
          {title}
        </h4>
        <p className='text-muted opacity-50 mt-1 mb-2'>
        {description}
        </p>

        <p className="text-tiny uppercase font-bold">
          {author}
        </p>
        <small className="text-default-500">
          {date}
        </small>
      </CardBody>
    </Card>
  );
};

