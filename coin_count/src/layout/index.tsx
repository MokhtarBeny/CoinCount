import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/mouse/CustomCursor";
const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-white">
        <CustomCursor />
        <div>
          <Navbar />
        </div>
        <div>{children}</div>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
