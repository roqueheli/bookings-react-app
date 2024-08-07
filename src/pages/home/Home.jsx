import React from "react";
import Card from "../../components/card/Card";
import HighlightCard from "../../components/card/HighlightCard";
import Search from "../../components/search/Search";
import "./Home.css";

const Home = () => {
  return (
    <div className="overflow-container">
      <Search />
      <section className="home-container">
        <h3>Buscar por tipo de alojamiento</h3>
        <section className="card-container">
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
      </section>
      <section className="bg-dark-subtle home-container">
        <h3>Recomendaciones</h3>
        <section className="card-container">
          <HighlightCard />
          <HighlightCard />
        </section>
      </section>
      <section className="home-container">
        <section className="card-container">
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
      </section>
    </div>
  );
};

export default Home;
