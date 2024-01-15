import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios/axiosConfig";
import Link from "next/link";
import { CloseCircleFilled } from "@ant-design/icons";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [allCryptos, setAllcryptos] = useState([]);

  const getCryptos = async () => {
    try {
      const response = await axiosInstance.get(`/cryptos`);
      setAllcryptos(response.data);
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value === "") {
      setResults([]);
      return;
    }

    const searchPattern = new RegExp(value, "i");
    const searchCrypto = allCryptos.filter((crypto) =>
      searchPattern.test(crypto.name)
    );
    setResults(searchCrypto);
  };

  useEffect(() => {
    getCryptos();

    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setSearchTerm("");
        setResults([]);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container">
      <input
        type="text"
        className="p-3 rounded bg-white text-black bg-gray-200 border-1"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && results.length > 0 && (
        <div className="absolute mt-1 rounded bg-white text-black w-full">
          {results.map((crypto) => (
            <Link key={crypto.id} href={`/crypto/${crypto.id}`}>
              <div className="px-4 border-b-1 py-3 flex align-center hover:bg-gray-200 cursor-pointer">
                <img src={crypto.icon} alt={crypto.name} className="w-4 h-4 mr-2" />
                {crypto.name} ({crypto.symbol})
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
