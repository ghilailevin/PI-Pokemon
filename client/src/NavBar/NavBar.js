import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { getPokemonByName } from "../actions/actions";
import { getPokemons, filterPokemons } from "../actions/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function NavBar() {
  const [pokemon, setPokemon] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  // let allPokemons = useSelector((state) => state.allPokemons);
  // let pokemonFilter = useSelector((state) => state.pokemonFilter);
  const [state, setState] = useState([]);

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(filterPokemons());
  }, [dispatch]);

  const handleChange = (e) => {
    setPokemon(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPokemonByName(pokemon.toLowerCase()));
    history.push(`/home/pokemon`);
  };
  //Filtrado por Tipo
  const typesFilter = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
    dispatch(filterPokemons(e.target.value));
  };

  return (
    <header className="header">
      <nav className="navBar">
        <ul>
          <Link to={"/home"}>
            <li className="">
              <span>Home</span>
            </li>
          </Link>
          <Link to={"/home/form"}>
            <li>
              <span className="link_crear">Crea tu propio Pokemon</span>
            </li>
          </Link>
          <Link to={"/"}>
            <li className="">
              <span>Inicio</span>
            </li>
          </Link>
          <Link to={"/home/form/pokemonCreated"}>
            <li className="">
              <span>Pokemones Creados</span>
            </li>
          </Link>
        </ul>

        {/* Filtrar por tipo */}
        <div className="filtro">
          <select id="filtrado" onChange={typesFilter}>
            <option defaultValue>Fitrar por tipo... </option>
            <option className="Normal" value="normal">
              Normal
            </option>
            <option className="Flying" value="flying">
              Flying
            </option>
            <option className="Poison" value="poison">
              Poison
            </option>
            <option className="Ground" value="ground">
              Ground
            </option>
            <option className="Bug" value="bug">
              Bug
            </option>
            <option className="Fire" value="fire">
              Fire
            </option>
            <option className="Water" value="water">
              Water
            </option>
            <option className="Grass" value="grass">
              Grass
            </option>
            <option className="Electric" value="electric">
              Electric
            </option>
            <option className="Fairy" value="fairy">
              Fairy
            </option>
          </select>
        </div>
        <form>
          <div className="btn_search">
            <input
              type="text"
              autoComplete="on"
              placeholder="Busca por nombre..."
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Buscar</button>
          </div>
        </form>
      </nav>
    </header>
  );
}