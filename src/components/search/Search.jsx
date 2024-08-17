import React, { useState } from "react";
import { GeoAltFill, Calendar } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Search.css';

const Search = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <section className="search-container">
      <nav className="bg-dark nav-container">
        <div className="container">
          <h3 className="h3-title text-center py-3">Busca ofertas en hoteles, casas y mucho más...</h3>
          <form className="row g-3 justify-content-center" role="search">
            <div className="col-12 col-md-5">
              <div className="input-group">
                <span className="input-group-text" id="addon-wrapping"><GeoAltFill /></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="¿A dónde vamos?"
                  aria-label="¿A dónde vamos?"
                  aria-describedby="addon-wrapping"
                />
              </div>
            </div>
            <div className="col-12 col-md-5">
              <div className="input-group flex-nowrap">
                <span className="input-group-text" id="addon-wrapping"><Calendar /></span>
                <DatePicker selected={startDate}
                  onChange={(dates) => { const [start, end] = dates; setStartDate(start); setEndDate(end); }}
                  startDate={startDate} endDate={endDate} selectsRange
                  placeholderText="Check in - Check out" className="form-control" dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="col-12 col-md-2 d-grid">
              <button className="btn btn-info btn-lg h-100 w-100 search-color" type="submit">Buscar</button>
            </div>
          </form>
        </div>
      </nav>
    </section>
  );
};

export default Search;
