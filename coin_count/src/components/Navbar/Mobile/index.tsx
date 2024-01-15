import { useEffect, useState } from "react";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Chip,
  Avatar,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import Image from "next/image";
import SearchBar from "../../searchbar";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

export default function _Navbar() {
  const { auth } = useSelector((state: any) => state);
  const [cryptos, setCryptos] = useState([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuStyle: React.CSSProperties = {
    right: isMenuOpen ? "0" : "-100%",
    position: "fixed",
    top: "0",
    transition: "0.3s ease-in-out",
  };

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch("/api/cryptos");
        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de cryptomonnaie:",
          error
        );
      }
    };

    //fetchCryptos();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex overflow-hidden w-full bg-white p-4 border-b-1 shadow-sm justify-between align-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              width={40}
              height={40}
              alt="coin count logo"
            />
            <p className="font-bold text-inherit">Coin Count</p>
          </Link>
        </div>
        <div>
          <button
            className="border p-2 flex justify-center align-center"
            onClick={toggleMenu}
          >
            <MenuOutlined />
          </button>
        </div>
      </div>
      <div>
        <div
          style={menuStyle}
          className="bg-white z-50 w-full h-full flex flex-col"
        >
          <div className="pt-5 px-5 flex justify-end">
            <button
              className="border p-2 flex justify-center align-center"
              onClick={toggleMenu}
            >
              <CloseOutlined />
            </button>
          </div>
          <div className="justify-end">
            {auth.token == "" || auth.token == null ? (
              <>
              <div className="flex justify-between p-3 gap-3">
                  <Link href="/login"
                    className="w-1/2 btn bg-primary text-white p-2 flex align-center justify-center"
                  >Login</Link>

                  <Link href="/register"
                    className="w-1/2 btn bg-white text-primary border-primary border-1 p-2 flex align-center justify-center"
                  
                  >
                      Sign Up
                  </Link>
              </div>
                

              </>
            ) : (
              <>
              <div className="flex justify-center align-center mb-5 ">
                <Link href="/profile" >
                    <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center mx-2">
                      <span className="text-white">
                        {auth.user.username[0].toUpperCase()}
                      </span>
                    </div>
                  <div>Welcome, {auth.user.username.split(" ")[0]}</div>
                </Link>
                {auth.user.role === "admin" && (
                  <Link href="/admin"
                  className="text-danger bg-transparent border border-danger rounded px-4 py-2">
                      Admin
                  </Link>
                )}
              </div>

               
              </>
            )}
          </div>
          <div className="flex flex-col mt-2 border-t-3">
            <Link href="/" className="text-foreground border-b-1 px-4 py-3">
              Home
            </Link>
            <Link
              href="/crypto/dashboard"
              className="text-foreground border-b-1 px-4 py-3"
            >
              Coin
            </Link>
            <Link href="/article" className="text-foreground border-b-1 px-4 py-3">
              Articles
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
