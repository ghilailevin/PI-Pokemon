import React from "react";
import { useState, useEffect } from "react";
import { getTypes } from "../actions/actions";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import crearPokemon from "./Post";

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allTypes = useSelector((state) => state.types);

  const [form, setForm] = useState({
    nombre: "",
    img: "",
    vida: "",
    fuerza: "",
    defensa: "",
    velocidad: "",
    peso: "",
    altura: "",
    types: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function stateReset() {
    setForm({
      nombre: "",
      img: "",
      vida: "",
      fuerza: "",
      defensa: "",
      velocidad: "",
      peso: "",
      altura: "",
      types: [],
    });
  }

  let validateNum = /^([0-9])*$/;
  let validateUrl = /^https?:\/\/(?!\/)/i;

  const validate = () => {
    let errors = {};
    if (!form.nombre) {
      errors.nombre = "Nombre es requerido";
    }
    if (!validateUrl.test(form.img)) {
      errors.imagen = "Deber ser una URL válida";
    }
    if (!validateNum.test(form.vida)) {
      errors.vida = "Debe ser un numero";
    }
    if (!validateNum.test(form.fuerza)) {
      errors.fuerza = "Debe ser un numero";
    }
    if (!validateNum.test(form.defensa)) {
      errors.defensa = "Debe ser un numero";
    }
    if (!validateNum.test(form.velocidad)) {
      errors.velocidad = "Debe ser un numero";
    }
    if (!validateNum.test(form.peso)) {
      errors.peso = "Debe ser un numero";
    }
    if (!validateNum.test(form.altura)) {
      errors.altura = "Debe ser un numero";
    }
    return errors;
  };

  const handleChange = (event) => {
    setForm(() => {
      return {
        ...form,
        [event.target.name]: event.target.value,
      };
    });
    setErrors(
      validate({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !errors.nombre & !errors.img &&
      !errors.vida &&
      !errors.fuerza &&
      !errors.defensa &&
      !errors.velocidad &&
      !errors.peso &&
      !errors.altura &&
      !errors.types
    ) {
      crearPokemon(form);
      stateReset();
      alert("Pokemon creado correctamente");
      history.push(`/home/form/pokemoncreated`);
    } else {
      alert("los campos deben ser completados");
    }
  }

  const handleType = (event) => {
    setForm(() => {
      return {
        ...form,
        types: form.types.concat(event.target.value),
      };
    });
  };

  return (
    <div className="container_form">
      <h2 className="form_Title">Crea tu propio Pokemon!</h2>
      <div className="formulario">
        <form onSubmit={handleSubmit}>
          <div className="form_Nombre">
            <label className="nombreTexto">Nombre</label>
            <input
              type="text"
              className={errors.nombre && "warning"}
              value={form.nombre}
              name="nombre"
              placeholder="Nombre de tu Pokemon"
              onChange={handleChange}
            />
            {errors.nombre && <p className="warning">{errors.nombre}</p>}
          </div>
          <div className="form_Imagen">
            <label className="imagenTexto">Imagen</label>
            <input
              type="text"
              className={errors.img && "warning"}
              value={form.img}
              name="img"
              placeholder="URL de la imagen"
              onChange={handleChange}
            />
            {errors.nombre && <p className="warning">{errors.img}</p>}
          </div>
          <div className="form_Vida">
            <label className="vidaTexto">Vida</label>
            <input
              type="text"
              className={errors.vida && "warning"}
              value={form.vida}
              name="vida"
              placeholder="Elige la vida de tu Pokemon"
              onChange={handleChange}
            />
            {errors.vida && <p className="warning">{errors.vida}</p>}
          </div>

          <div className="form_Fuerza">
            <label className="fuerzaTexto">Fuerza</label>
            <input
              type="text"
              className={errors.fuerza && "warning"}
              value={form.fuerza}
              name="fuerza"
              placeholder="Número para la Fuerza"
              onChange={handleChange}
            />
            {errors.fuerza && <p className="warning">{errors.fuerza}</p>}
          </div>
          <div className="form_Defensa">
            <label className="defensaTexto">Defensa</label>
            <input
              type="text"
              className={errors.defensa && "warning"}
              value={form.defensa}
              name="defensa"
              placeholder="Número para la Defensa"
              onChange={handleChange}
            />
            {errors.defensa && <p className="warning">{errors.defensa}</p>}
          </div>
          <div className="form_Velocidad">
            <label className="velocidadTexto">Velocidad</label>
            <input
              type="text"
              className={errors.velocidad && "warning"}
              value={form.velocidad}
              name="velocidad"
              placeholder="Número para la Velocidad"
              onChange={handleChange}
            />
            {errors.velocidad && <p className="warning">{errors.velocidad}</p>}
          </div>
          <div className="form_Peso">
            <label className="pesoTexto">Peso</label>
            <input
              type="text"
              className={errors.peso && "warning"}
              value={form.peso}
              name="peso"
              placeholder="Número para el Peso"
              onChange={handleChange}
            />
            {errors.peso && <p className="warning">{errors.peso}</p>}
          </div>
          <div className="form_Altura">
            <label className="alturaTexto">Altura</label>
            <input
              type="text"
              className={errors.altura && "warning"}
              value={form.altura}
              name="altura"
              placeholder="Número para la Altura"
              onChange={handleChange}
            />
            {errors.altura && <p className="warning">{errors.altura}</p>}
          </div>
          <div className="tipos_titulo">
            <span>De qué tipo será tu Pokemon</span>
            <div onChange={handleType} value={form.types}>
              {allTypes.map((e) => (
                <div>
                  <input value={e} type="checkbox" />
                  {e}
                </div>
              ))}
            </div>
          </div>
          <button id="btn_crear" onClick={handleSubmit}>
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}