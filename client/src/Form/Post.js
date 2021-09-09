import axios from "axios";

export default async function crearPokemon(input) {
  try {
    const response = await axios({
      url: "http://localhost:3001/pokemon",
      method: "POST",
      data: input,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}