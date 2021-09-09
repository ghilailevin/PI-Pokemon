import React from "react";
import Navbar from "../src/NavBar/NavBar";
import { Route } from "react-router-dom";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Home from "../src/Home/Home";
import PokemonCreated from "../src/PokemonCreate/PokemonCreated";
import PokemonDetail from "../src/PokemonDetail/PokemonDetail";
import LandingPage from "../src/LandingPage/LandingPage";
import Form from "../src/Form/Form";
import PokemonSearched from "../src/PokemonSearched/PokemonSearched";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Navbar} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/form" component={Form} />
      <Route exact path="/home/pokemon" component={PokemonSearched} />
      <Route
        exact
        path="/home/form/pokemoncreated"
        component={PokemonCreated}
      />
      <Route exact path="/home/pokemon/:id" component={PokemonDetail} />
    </BrowserRouter>
  );
}

export default App;