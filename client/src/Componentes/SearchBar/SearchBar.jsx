import { useDispatch } from "react-redux";
import { getDogsName } from "../../Redux/action";
import { useState } from "react";

const SearchBar = () => {

  const dispatch = useDispatch();

  const [name, setName] = useState("") ; // name sera la primera vez un string vacio

  const handleChange = (event) => {
    setName(event.target.value);
  };
  return (
    <div >
      <label type htmlFor="Bar">
        Search by race
      </label>
      <input
        placeholder="Search"
        type="text"
        name="Bar"
         onkeydown="return /[a-z]/i.test(event.key)" //validar solo letras
        onChange={handleChange}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          dispatch(getDogsName(name));
        }}
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
