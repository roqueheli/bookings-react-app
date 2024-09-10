import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";
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
              <div className="dropdown">
                <button className="btn dropdown-toggle header-button responsive-button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  ¡Hola, {userName}!
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                  <li><Link className="dropdown-item" to="/reservations">Reservas anteriores</Link></li>
                  <li><Link className="dropdown-item" to="/settings">Configuración</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button onClick={logout} className="dropdown-item">
                      Cerrar sesión <FaSignOutAlt />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              {(isLoggedIn || location.pathname !== '/admin') && (
                <div className="d-grid gap-2 col-4">
                  <Link to={'/user/register'} className="btn btn-outline-info btn-md header-button" type="button">Crear cuenta</Link>
                </div>
              )}
              <div className="d-grid gap-2 col-4">
                  <Link to={location.pathname === '/admin' ? '/admin/user/login' : '/user/login'} className="btn btn-outline-info btn-md header-button" type="button">Iniciar sesión</Link>
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