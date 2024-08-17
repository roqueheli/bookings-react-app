import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin-container">
      <h1 className="header">Panel de Administración</h1>
      <div className="button-container">
        <Link to="/admin/lst-place" className="btn btn-primary m-3 w-50 admin-button">Lista lugares</Link>
        <Link to="/admin/add-place" className="btn btn-primary m-3 w-50 admin-button">Crear lugar</Link>
      </div>
    </div>
  );
};

export default Admin;
