import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/mouse/CustomCursor";
import NavbarMobile from "@/components/Navbar/Mobile";
import Navbar from "@/components/Navbar";

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); 
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="bg-white">
        <CustomCursor />
        {isMobile ? (
          <div>
            <NavbarMobile />
          </div>
        ) : (
          <div>
            <Navbar />
          </div>
        )}
        <div>{children}</div>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
