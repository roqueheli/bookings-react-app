import React from "react";
import './Header.css';

//#3DD9EB
//#F55376
//#EB0000

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-position">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="./src/assets/reserva-96.png"
            alt="RA Bookings"
            width="50"
            height="44"
          />
        </a>
        <a className="navbar-brand fs-6 title-color" href="/">Hospedaje perfecto, experiencias inolvidables.</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <div className="d-grid gap-1 col-4">
              <button className="btn btn-outline-info btn-md header-button" type="button">Crear cuenta</button>
          </div>
          <div className="d-grid gap-2 col-4">
              <button className="btn btn-outline-info btn-md header-button" type="button">Iniciar sesión</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
