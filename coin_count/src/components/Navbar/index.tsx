import { useEffect, useState } from "react";
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import SearchBar from "../searchbar";



export default function _Navbar() {

  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les données des cryptomonnaies
    const fetchCryptos = async () => {
      try {
        const response = await fetch('/api/cryptos'); // Ajustez l'URL en fonction de votre configuration d'API
        const data = await response.json();
        setCryptos(data); // Supposons que l'API renvoie directement un tableau
      } catch (error) {
        console.error('Erreur lors de la récupération des données de cryptomonnaie:', error);
      }
    };

    //fetchCryptos();
  }, []);

  return (
    <Navbar isBordered isBlurred={false}>
      <NavbarBrand>       
       
         <p className="font-bold text-inherit">Coin Count</p>
      
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 " justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            My DashBoard
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Cryptomonnaie
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Articles
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <SearchBar/>
        </NavbarItem>
      </NavbarContent>
      
    </Navbar>
  );
}