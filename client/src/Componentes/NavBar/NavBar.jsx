import style from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import React, { useEffect } from "react";
import { getTemperaments,filterTemperaments, filterOrigin,orderRaza} from "../../Redux/action";

const NavBar = () => {
  const dispatch = useDispatch();

  useEffect(() => { // accion traer temperamentos
    dispatch(getTemperaments());
  }, []);

  const temperament = useSelector((state) => state.temperament);//estado global con temperamentos

  const filter = (event) => {
    dispatch(filterTemperaments(event.target.value));// filtro de los temperamentos
  };

  const filterApiAndDatabase = (event)=>{ //filtro de los perros
dispatch(filterOrigin(event.target.value))
  }

  const orderRaces =(event)=>{
    dispatch(orderRaza(event.target.value))
  }

  return (
    <div>
      <div>
        <SearchBar />
      </div>

      <div>
      <label>Select Temperament</label> 
        <select onChange={filter} className={style.select}>
          {temperament.length &&
            temperament.map((arg) => (
              <option key={arg.id} value={arg.name}>
                {arg.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label>Filter by origin:</label>
        <select onChange={filterApiAndDatabase}>
          <option value="Api">Api</option>
          <option value="dataBase" >Data base</option>
        </select>
        </div>

        <div>
            <label>Race</label>
          <select onChange={orderRaces}>
            <option value="Upward">Upward</option>
            <option value="Falling">Falling</option>
          </select>
          </div>

          <div>
              <label>Weight</label>
            <select>
              <option value="Upward">Upward</option>
              <option value="Falling">Falling</option>
            </select>
          </div>

    </div>
  );
};

export default NavBar;
