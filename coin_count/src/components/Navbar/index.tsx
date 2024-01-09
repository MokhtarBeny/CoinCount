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
import SearchBar from "../searchbar";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function _Navbar() {
  const { auth } = useSelector((state: any) => state);
  console.log(auth);
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les données des cryptomonnaies
    const fetchCryptos = async () => {
      try {
        const response = await fetch("/api/cryptos"); // Ajustez l'URL en fonction de votre configuration d'API
        const data = await response.json();
        setCryptos(data); // Supposons que l'API renvoie directement un tableau
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de cryptomonnaie:",
          error
        );
      }
    };

    //fetchCryptos();
  }, []);

  return (
    <Navbar isBordered isBlurred={false}>
      <NavbarBrand>
        <div className="flex items-center gap-2">
          <Link href="/">

          <Image src="/assets/logo.png" width={40} height={40} alt="coin count logo" />
          <p className="font-bold text-inherit"
          >Coin Count</p>
          </Link>
        </div>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        <NavbarItem>
          <Link  color="foreground" href="/crypto/dashboard">
            My DashBoard
          </Link>
        </NavbarItem>        
        <NavbarItem>
          <Link color="foreground" href="/article">
            Articles
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {auth.token == "" || auth.token == null ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>

            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <Link href="/profile">
              <a>
                <Chip
                  variant="flat"
                  avatar={
                    <Avatar
                      size="sm"
                      name={auth.user.username[0].toUpperCase()}
                    />
                  }
                >
                  Welcome, {auth.user.username.split(" ")[0]}
                </Chip>
              </a>
            </Link>
            {auth.user.role === 'admin' && (
            <Link href="/admin">
                <Button as={Link} color="primary" href="/admin" variant="flat">
                    Admin
                </Button>
            </Link>
        )}
          </>
        )}

        <NavbarItem>
          <SearchBar />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
