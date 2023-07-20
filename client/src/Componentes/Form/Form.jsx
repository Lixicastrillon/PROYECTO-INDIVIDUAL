import { useNavigate } from "react-router-dom";
import style from "./Form.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDogs } from "../../Redux/action";

const Form = () => {
  const dispatch = useDispatch();

  let listTemperaments = useSelector((state) => state.temperament);
  useEffect(() => {
    // accion traer temperamentos
    if (!listTemperaments.length) {
      dispatch(getTemperaments());
    }
  }, []);

  const [dog, setDogs] = useState({
    name: "",
    image: "",
    height: 10,
    weight: 10,
    life_span: 8,
    id: [],
  });

  const [errors, setErros] = useState({});

  const handleInputChange = (event) => { // guarda los valores en dog
    handleInputErrors(event);
    setDogs({
      ...dog,
      [event.target.name]: event.target.value,
    });
  };

  const handleDogTemperament = (event) => { // concatena los temperamentos para guardalos en el dog
    setDogs({
      ...dog,
      [event.target.name]: [...dog.id, event.target.value],
    });
    setErros(
      validate({
        ...dog,
        [event.target.name]: [...dog.id, event.target.value],
      })
    );
  };
  const handleInputErrors = (event) => { // valida los errores de dog
    setErros(
      validate({
        ...dog,
        [event.target.name]: event.target.value,
      })
    );
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDogs(dog));
    navigate("/home");
    setDogs({
      name: "",
      image: "",
      height: 10,
      weight: 10,
      life_span: 8,
      id: [],
    });
  };

  var danger = {
    marginTop: "7px",
    display: "block",
    color: "red",
    fontSize: "13px",
  };

  const validate = (dog) => {
    console.log(dog.id)
    let errors = {};
    if (!dog.name) {
      errors.name = "Name is a required field";
    } else if (!/^[A - Za-z]+$/i.test(dog.name)) {
      errors.name = "Enter only letters (A-Z) or (a-z)";
    } else if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(dog.height)) {
      errors.height = "Negative numbers are not allowed";
    } else if (dog.height < 10 || dog.height > 160) {
      errors.height = "minimum height 10 and maximum height 160";
    } else if (dog.weight < 10 || dog.weight > 100) {
      errors.weight = "minimum weight 10 and maximum weight 100";
    } else if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(dog.weight)) {
      errors.weight = "Negative numbers are not allowed";
    } else if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(dog.life_span)) {
      errors.life_span = "Negative numbers are not allowed";
    } else if (dog.life_span < 8 || dog.life_span > 18) {
      errors.life_span = "minimum life span 8 and maximum life span 18";
    } else if (!dog.id.length) {
      errors.id = "select at least one";
    }
    return errors;
  };

  return (
    <div className={style.all}>
      <div className={style.allbody}>
        <h1>Add your dog 💗🐶 </h1>
        <form onSubmit={handleSubmit}>
          <div className={style.body}>
            <label htmlFor="name">Dog breed</label>
            <input
              className={style.button}
              type="text"
              name="name"
              value={dog.name}
              required
              onkeydown="return /[a-z]/i.test(event.key)" //validar solo letras
              onChange={handleInputChange}
            ></input>
            {errors.name && <p style={danger}>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="image">Image</label>
            <input
              className={style.button}
              type="text"
              name="image"
              value={dog.image}
              onChange={handleInputChange}
            ></input>
          </div>

          <div>
            <label htmlFor="height">Height in Centimeters</label>
            <input
              className={style.button}
              name="height"
              value={dog.height}
              required
              onChange={handleInputChange}
              type="number"
              min="10"
              max="160"
            ></input>
            {errors.height && <p style={danger}>{errors.height}</p>}
          </div>

          <div>
            <label htmlFor="weight">Weight in kilograms</label>
            <input
              className={style.button}
              type="number"
              name="weight"
              value={dog.weight}
              onChange={handleInputChange}
              min="1"
              max="100"
            ></input>
            {errors.weight && <p style={danger}>{errors.weight}</p>}
          </div>

          <div>
            <label htmlFor="life_span">Life span</label>
            <input
              className={style.button}
              type="number"
              name="life_span"
              value={dog.life_span}
              required
              onChange={handleInputChange}
              min="8"
              max="18"
            ></input>
            {errors.life_span && <p style={danger}>{errors.life_span}</p>}
          </div>

          <div>
            <label htmlFor="id">Select temperaments</label>
            <div className={style.check}>
              {listTemperaments &&
                listTemperaments.map((arg, i) => {
                  return (
                    <div className={style.we}>
                      <input
                        className={style.box}
                        type="checkbox"
                        name="id"
                        key={i}
                        value={arg.id}
                        onChange={handleDogTemperament}
                      />
                      <label>{arg.name}</label>
                    </div>
                  );
                })}
              {errors.id && <p style={danger}>{errors.id}</p>}
            </div>
          </div>
          <div className={style.sub}>
            <button
              disabled={
                errors.name ||
                errors.height ||
                errors.weight ||
                errors.weigth ||
                errors.id
              }
              className={style.submit}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;
