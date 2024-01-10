import React from "react";
import Navbar from "@/components/Navbar";
const Layout = ({ children }) => {
  return (
    <div className="bg-white">
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
