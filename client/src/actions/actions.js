import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const FILTER_POKEMONS = "FILTER_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const RESTAURAR = "RESTAURAR";

//Obtener todos los pokemones del Back
export const getPokemons = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/pokemon")

      .then((resp) => {
        dispatch({
          type: GET_POKEMONS,
          payload: resp.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Obtener el Pokemon por nombre
export const getPokemonByName = (name) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/pokemon?name=${name}`)

      .then((response) => {
        dispatch({
          type: GET_POKEMON_BY_NAME,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Obtener el detalle del Pokemon por ID
export const getPokemonDetail = (id) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/pokemon/${id}`)
      .then((response) => {
        dispatch({ type: GET_POKEMON_DETAIL, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//Filtrar los Pokemones por Tipo
export const filterPokemons = (type) => {
  return {
    type: FILTER_POKEMONS,
    payload: type,
  };
};

//Obtener los Tipos
export const getTypes = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/type")
      .then((resp) => {
        dispatch({
          type: GET_TYPES,
          payload: resp.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};