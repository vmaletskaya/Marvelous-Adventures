import React from "react";


import Header from "./Header/Header";
import Hero from "../pages/HomePage/Hero"
import LastComics from "elements/LastComics/LastComics";

export const App = () => {
  return (
    <div>
      <Header />
      <Hero />
      <LastComics />
    </div>
  );
};
