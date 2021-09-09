import React from "react";
import { useSelector } from "react-redux";

export default function PokemonSearched() {
  const pokemonSearched = useSelector((state) => state.pokemon);

  if (pokemonSearched) {
    return (
      <div className="poke_Detail">
        <div className="detalles">
          <img
            className="poke_img"
            src={pokemonSearched.imagen}
            alt={pokemonSearched.nombre}
          ></img>
          <div className="tipos">
            <span className="tipos_nombre">
              {pokemonSearched.types.map(
                (e) =>
                  e.type.name.charAt(0).toUpperCase() + e.type.name.slice(1)
              )}
            </span>
          </div>
          <div className="container_stats">
            <p className="poke_Id">ID: {pokemonSearched.id}</p>
            <p className="poke_nombre">
              {pokemonSearched.nombre.toUpperCase()}
            </p>
            <div className="poke_estadisticas">
              <p>Vida: {pokemonSearched.hp}</p>
              <p>Ataque: {pokemonSearched.ataque}</p>
              <p>Defensa: {pokemonSearched.defensa}</p>
              <p>Velocidad: {pokemonSearched.velocidad}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>No se encontro el Pokemon</h1>;
  }
}