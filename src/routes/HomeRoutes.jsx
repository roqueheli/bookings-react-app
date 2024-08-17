import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import PlaceCardDetail from "../components/placecard/PlaceCardDetail";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/place/:id" element={<PlaceCardDetail />} />
    </Routes>
  );
};

export default HomeRoutes;
