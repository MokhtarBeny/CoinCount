type MapFunction = (item: any) => any;

const coindeskMapFunction = (item: any) => ({
    title: item.title[0],
    description: item.description[0],
    date: item.pubDate[0],
    link: item.link[0],
    image: item['media:content'][0]['$']['url'],
    author: item["dc:creator"][0],
    categories: item.category.map((category: any) => category._)
});

const bitcoinMagazineFunction = (item: any) => ({
    title: item.title[0],
    description: item.description[0],
    date: item.pubDate[0],
    link: item.link[0],
    image: item['media:thumbnail'][0]['$']['url'],
    author: item["dc:creator"][0],
    categories: item.category.map((category: any) => category)
});

const newsBitcoinFunction = (item: any) => ({
    title: item.title[0],
    description: item.description[0],
    date: item.pubDate[0],
    link: item.link[0],
    image: item['bnmedia:post-thumbnail'][0]['bnmedia:url'][0],
    author: item["dc:creator"][0],
    categories: item.category.map((category: any) => category)
});



const mappingFunctions: { [key: string]: MapFunction } = {
    'coin desk': coindeskMapFunction,
    'bitcoin magazine': bitcoinMagazineFunction,
    'news bitcoin': newsBitcoinFunction

};


const sourceMapping = {
    coindeskMapFunction, mappingFunctions
};


export default sourceMapping;
