import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRegister from "../components/user/UserRegister";
import Login from "../components/user/Login";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<UserRegister />} />
    </Routes>
  );
};

export default UserRoutes;
