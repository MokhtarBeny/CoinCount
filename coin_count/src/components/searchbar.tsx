// components/SearchBar.tsx
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios/axiosConfig";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const [allCryptos, setAllcryptos] = useState([]);


  const getCryptos = async () => { 

    try {
      
      const response = await axiosInstance.get(`/cryptos`);
      
      setAllcryptos(response.data)
      //console.log(response.data)

      } catch (error) {
        console.error("Fetch error: ", error);       
      }

  }

  const handleSearch = async (event:any) => {

    setSearchTerm(event.target.value);

    if (searchTerm == "") {setResults([]); return}


    const searchPattern = new RegExp(searchTerm, 'i');

    const searchCrypto = allCryptos.filter((crypto) => searchPattern.test(crypto.name));    

    console.log(searchCrypto)

   
      setResults(searchCrypto);

      return;
      
  };

  useEffect(() => {getCryptos()
  
   
  }, [])  

  console.log(typeof results)


  return (
    <div>
      <input
        type="text"
        className="p-3 rounded bg-white text-black"
        placeholder="Saisissez votre cryptomonnaie"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="absolute mt-1 rounded bg-white text-black w-full">
        {results.map((crypto) => (
          <div key={crypto.id} className="p-2 hover:bg-gray-200">
            {crypto.name} ({crypto.symbol})
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;


