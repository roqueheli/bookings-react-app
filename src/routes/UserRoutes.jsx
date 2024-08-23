import React from "react";
import { Route, Routes } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import UserRegister from "../components/user/UserRegister";
import Login from "../components/user/Login";
import NotFound from "../components/notfound/NotFound";
import "../Transition.css";

const UserRoutes = () => {
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} timeout={1000} classNames="fade">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default UserRoutes;
