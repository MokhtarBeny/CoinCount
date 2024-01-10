import React from "react";
import { Card, CardBody, Image } from "@nextui-org/react";

export default function RssCard({
  title,
  description,
  author,
  date,
  image,
  link,
}) {
  return (
    <Card className="p-3">
      <a href={link}>
        <CardBody className="overflow-visible py-2 p-4">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={image}
          />
          <h4 className="font-bold text-large">{title}</h4>
          <p className="text-muted opacity-50 mt-1 mb-2">{description}</p>
          <p className="text-tiny uppercase font-bold">{author}</p>
          <small className="text-default-500">{date}</small>
        </CardBody>
      </a>
    </Card>
  );
}
