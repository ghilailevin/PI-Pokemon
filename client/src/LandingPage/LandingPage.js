import React from "react";
// import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import "./LandingPage.css";
import Pokemon from "../img/pokemon9.png";
// import { getPokemons } from "../../actions/actions";

export default function LandingPage() {
  // const dispatch = useDispatch();
  // useSelector((state) => state.allPokemons);

  // useEffect(() => {
  //   dispatch(getPokemons());
  // }, [dispatch]);
  return (
    <header className="landingPage">
      <img
        className="imagen_principal"
        alt="imagen_landing"
        src={Pokemon}
      ></img>
      <div className="landingPage_contenido">
        <Link className="entrar" to="/home">
          ENTRAR
        </Link>
      </div>
    </header>
  );
}