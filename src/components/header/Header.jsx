import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './Header.css';

const Header = () => {
  const { isLoggedIn, userName, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-position">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="./src/assets/reserva-96.png" alt="RA Bookings" width="50" height="44" />
        </Link>
        <Link className="navbar-brand fs-6 title-color" to="/">Hospedaje perfecto, experiencias inolvidables.</Link>
        <button
          className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          {isLoggedIn ? (
            <div className="d-flex align-items-center">
              <span className="navbar-text me-3">¡Hola, {userName}!</span>
              <button onClick={logout} className="btn btn-outline-danger btn-md header-button">Cerrar sesión</button>
            </div>
          ) : (
            <>
              {(isLoggedIn || location.pathname !== '/admin') && (
                <div className="d-grid gap-1 col-4">
                  <Link to={'/user/register'} className="btn btn-outline-info btn-md header-button" type="button">Crear cuenta</Link>
                </div>
              )}
              <div className="d-grid gap-2 col-4">
                  <Link  to={'/user/login'} className="btn btn-outline-info btn-md header-button" type="button">Iniciar sesión</Link>
              </div>
            </>
          )
          }
        </div>
      </div>
    </nav>
  );
};

export default Header;