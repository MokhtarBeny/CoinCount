import { useEffect, useState } from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
//import { RssCardProps } from "./category"; 

//const RssCard: React.FC<RssCardProps> = ({ title }) => {
//  const [feedData, setFeedData] = useState<any>(null);

//  useEffect(() => {
//    const fetchData = async () => {
//      try {
//        const response = await axios.get("https://cryptotribune.fr/rss-feeds");
        //console.log(response.data);
//        console.log("Data from the RSS feed:", response);
//        setFeedData(response.data);
//      } catch (error) {
//        console.error("Erreur lors de la récupération du flux RSS:", error);
//      }
//    };

//    fetchData();
//  }, []);

//  import React, { useState } from "react";

  export default function App() {
    const [rssUrl, setRssUrl] = useState("");
    const [items, setItems] = useState([]);
  
    const getRss = async (e) => {
      e.preventDefault();
      const urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
      if (!urlRegex.test(rssUrl)) {
        return;
      }
      const res = await fetch(`https://cryptotribune.fr/rss-feeds=${rssUrl}`);
      const { contents } = await res.json();
      const feed = new window.DOMParser().parseFromString(contents, "text/xml");
      console.log (res)
      const items = feed.querySelectorAll("item");
      const feedItems = [...items].map((el) => ({
        link: el.querySelector("link").innerHTML,
        title: el.querySelector("title").innerHTML,
        author: el.querySelector("author").innerHTML
      }));
      setItems(feedItems);
      console.log('jujujujju')
    };

    const functionTest = () => {
      console.log('from function test')
    }

    useEffect(()=>{
      console.log (items)
    }, [items])
 return (
    <Card className="py-4" onClick={getRss}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start" >
        <p onClick={getRss} className="text-tiny uppercase font-bold">saveToLocalStorage</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://www.01net.com/app/uploads/2023/04/cours-bitcoin-1-896x596.jpg"
          width={270}
        />
      </CardBody>
    </Card>
  );
    
};

