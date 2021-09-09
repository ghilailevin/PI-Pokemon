import {
    GET_POKEMONS,
    GET_POKEMON_BY_NAME,
    GET_POKEMON_DETAIL,
    FILTER_POKEMONS,
    GET_TYPES,
  
    // RESTAURAR,
  } from "../actions/actions";
  
  const initialState = {
    allPokemons: [],
    // pokemonBackUp: [],
    pokemon: undefined,
    pokemonDetail: {},
    pokemonFilter: [],
    pokemonesBD: [],
    pokemonesOriginales: [],
    types: [],
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_POKEMONS:
        return {
          ...state,
          allPokemons: action.payload,
          pokemonFilter: action.payload
        };
  
      case GET_POKEMON_BY_NAME:
        return {
          ...state,
          pokemon: action.payload,
        };
      case GET_POKEMON_DETAIL:
        return {
          ...state,
          pokemonDetail: action.payload,
        };
  
      case FILTER_POKEMONS:
        return {
          ...state,
          //Filtrar los Pokemones por tipo
          pokemonFilter: state.allPokemons.filter((poke) => {
            return poke.types.some((t) => t.name === action.payload);
          }),
        };
  
      case GET_TYPES:
        return {
          ...state,
          types: action.payload,
        };
      // case RESTAURAR:
      //   return {
      //     ...state,
      //     allPokemons: state.pokemonBackUp,
      //   };
  
      default:
        return state;
    }
  }
  
  export default rootReducer;