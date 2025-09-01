import React from "react";
import "./components/hero.css";
import Model1 from "./assets/model1.png";
import Model2 from "./assets/model2.png";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className="hero-slogan">SEEBEYOND</h1>
      </div>

      <div className="hero-images">
        <img src={Model1} alt="Model 1" className="model-image" />
        <img src={Model2} alt="Model 2" className="side-image side-right" />
      </div>
    </section>
  );
}
