import React, { useEffect } from "react";
import styles from "./CustomCursor.module.css";

const CustomCursor = () => {
  useEffect(() => {
    const updateCursor = (e) => {
      const cursor = document.getElementById("custom-cursor");
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", updateCursor);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
    };
  }, []);

  return <div id="custom-cursor" className={styles.customCursor}></div>;
};

export default CustomCursor;
