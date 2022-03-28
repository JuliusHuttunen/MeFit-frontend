/* Home view */
import React from "react";
import CarouselHome from "../components/carousel/CarouselHome";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.DarkBack}>
      <CarouselHome />
    </div>
  );
};

export default Home;
