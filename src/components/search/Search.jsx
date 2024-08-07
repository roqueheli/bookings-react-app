import React from "react";
import './Search.css';

const Search = () => {
  return (
    <section className="search-main-container">
        <nav className="navbar bg-dark">
            <div className="container-fluid search-container">
                <h3 className="h3-title">Busca ofertas en hoteles, casas y mucho más</h3>
                <form className="d-flex form-container" role="search">
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">@</span>
                        <input type="text" className="form-control me-2" placeholder="¿A dónde vamos?" />
                    </div>
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">@</span>
                        <input className="form-control me-2" type="search" placeholder="Check in - Check out" />
                    </div>
                    <button className="btn btn-outline-info btn-md search-color" type="submit">Search</button>
                </form>
            </div>
        </nav>
    </section>
  );
};

export default Search;
