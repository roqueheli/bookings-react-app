import React from "react";
import { Route, Routes } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "../pages/home/Home";
import PlaceCardDetail from "../components/placecard/PlaceCardDetail";
import NotFound from "../components/notfound/NotFound";
import "../Transition.css";

const HomeRoutes = () => {
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={1000} classNames="fade">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/place/:id" element={<PlaceCardDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default HomeRoutes;
