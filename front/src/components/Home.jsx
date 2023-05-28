import React from "react";
import Header from "./Home/Header";
import Funcion from "./Home/Funcion";
import FAQ from "./Home/FAQ";
import "./styles/home.css";
import Planes from "./Home/Planes";
import Contacto from "./Home/Contacto";
export default function Home() {
  return (
    <div id="home" className="home">
      <Header />
      <Funcion />
      <FAQ />
      <Planes />
      <Contacto />
    </div>
  );
}
