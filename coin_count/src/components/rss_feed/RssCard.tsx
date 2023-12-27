import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
// import { JSDOM } from "jsdom";

// function cleanHtml(htmlString) {
//   // Conditionnez l'importation de jsdom pour qu'il soit utilisé uniquement côté serveur
//   const { document } = typeof window === "undefined" ? require("jsdom").jsdom() : new window.JSDOM(htmlString).window;
//   return document.body.textContent || "";
// }

export default function RssCard({title, description, author, date, image}) {
  //const cleanedDescription = cleanHtml(description);
  return (
    <Card className="py-4 ">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image}
          width={270}
        />
      </CardHeader>
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
}

