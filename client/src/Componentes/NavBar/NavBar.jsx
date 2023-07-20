import style from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getTemperaments,
  filterTemperaments,
  filterOrigin,
  orderRaza,
  orderWeight,
  allDogs
} from "../../Redux/action";

const NavBar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // accion traer temperamentos
    dispatch(getTemperaments());
  }, []);

  const temperament = useSelector((state) => state.temperament); //estado global con temperamentos

  const filter = (event) => {
    dispatch(filterTemperaments(event.target.value)); // filtro de los temperamentos
  };


  const filterApiAndDatabase = (event) => {
    //filtro de los perros
    dispatch(filterOrigin(event.target.value));
  };

  const orderRaces = (event) => {
    // ordenar razas
    dispatch(orderRaza(event.target.value));
  };
  const orderWeights = (event) => {
    // ordenar peso
    dispatch(orderWeight(event.target.value));
  };
const allDog =(event)=>{
    dispatch ( allDogs(event.target.value))}
 



  return (
    <div className={style.color}>
      <div className={style.m}>
        <h1 className={style.tittle}> 🌏 Dog world 💗🐶</h1>
      <button   className={style.all} value={"allDogs"} onClick={(e)=>allDog(e)}> All Dogs </button>
        <SearchBar/>
      </div>
      <div className={style.changes}>
        

        <label> 🪄 Do you want to create a dog? </label>
        <Link to="/form">
          <button className={style.button}>▶️</button>
        </Link>

        <label> Select Temperament </label>
        <select onChange={filter} className={style.button}>
          <option defaultValue  disabled >select</option>
          {temperament.length &&
            temperament.map((arg) => (
              <option key={arg.id} value={arg.name}>
                {arg.name}
              </option>
            ))}
        </select>

        <label> Filter by origin </label>
        <select className={style.button} onChange={filterApiAndDatabase}>
        <option value={"allDogs"}> All Dogs </option>
          <option value="Api">Api</option>
          <option value="dataBase">Data base</option>
        </select>

        <label> Breed  </label>
        <select onChange={orderRaces} className={style.button}>
          <option value="Upward">Upward</option>
          <option value="Falling">Falling</option>
        </select>

        <label> Weight </label>
        <select className={style.button} onChange={orderWeights}>
          <option value="Upward">Upward</option>
          <option value="Falling">Falling</option>
        </select>
      </div>
    </div>
  );
};

export default NavBar;
