import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const Layout = ({ children }) => {
  return (
    <div className="bg-white">
      <div>
        <Navbar />
      </div>
      <div>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
