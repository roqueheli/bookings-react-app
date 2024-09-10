import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../pages/admin/Admin";
import PlaceForm from "../components/admin/placeform/PlaceForm";
import PlaceList from "../components/admin/placelist/PlaceList";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/lst-place" element={<PlaceList />} />
      <Route path="/add-place" element={<PlaceForm />} />
    </Routes>
  );
};

export default AdminRoutes;
