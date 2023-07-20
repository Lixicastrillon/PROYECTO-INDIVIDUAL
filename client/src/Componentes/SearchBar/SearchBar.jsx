import { useDispatch } from "react-redux";
import { getDogsName } from "../../Redux/action";
import { useState } from "react";
import style from "./SearchBar.module.css"

const SearchBar = () => {

  const dispatch = useDispatch();

  const [name, setName] = useState("") ; // name sera la primera vez un string vacio

  const handleChange = (event) => {
    setName(event.target.value);
  };
  return (
    <div className={style.l}>
      <input className={style.button1}
        placeholder="search breed"
        type="text"
        name="Bar"
         onkeydown="return /[a-z]/i.test(event.key)" //validar solo letras
        onChange={handleChange}
      />
      <button className={style.button}
        onClick={(e) => {
          e.preventDefault();
          dispatch(getDogsName(name));
        }}
      > Search
      </button>
    </div>
  );
};

export default SearchBar;
