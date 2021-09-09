import React from "react";
import "./Pokemon.css";
import { Link } from "react-router-dom";

export default function Pokemon({ nombre, img, tipos, id }) {
  return (
    <div className="card_Poke">
      <div className="body_Poke">
        <div>
          <h2 className="nombre_Poke">{nombre.toUpperCase()}</h2>
        </div>
        <div>
          <Link to={`/home/pokemon/${id}`}>
            <img className="img_Poke" src={img} alt={nombre}></img>
          </Link>
        </div>
        <div>
          <p className="tipos_Poke">
            Tipos: <span className="tipos_nombre">{tipos}</span>
          </p>
        </div>
      </div>
    </div>
  );
}