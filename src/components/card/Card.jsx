import React from "react";

const Card = () => {
  return (
    <div className="card" style={{ width: "20.5rem", cursor: "pointer" }}>
      <img src="https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=" className="card-img-top" alt="..." />
      <div className="card-body">
        <h3>Hoteles</h3>
        <p className="card-text">
          <small className="text-body-secondary">
            807.105 hoteles
          </small>
        </p>
      </div>
    </div>
  );
};

export default Card;
