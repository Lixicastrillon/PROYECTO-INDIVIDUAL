import axios from "axios";

export const getDogs = () => {
  // la funcion retorna un cb // get - solicito todos los perros
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/dogs");
      return dispatch({
        type: "GET_DOGS",
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getDogsName = (name) => {
  // solicito nombre de raza
  return async (dispatch) => {
    // pedido por name
    try {
      const { data } = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      return dispatch({
        type: "GET_DOG",
        payload: data,
      });
    } catch (error) {
      alert("the race does not exist");
    }
  };
};

export const getDogsId = (idRaza) => {
  //  pedido por id

  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/dogs/${idRaza}`);
      return dispatch({
        type: "GET_DOGID",
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getTemperaments = () => {
  // lista de temperamentos
  return async (dispatch) => {
    try {
      let { data } = await axios.get("http://localhost:3001/temperament");
      return dispatch({
        type: "GET_TEMPERAMENTS",
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const filterTemperaments = (temperament) => {
  // filtrar temperamentos
  return {
    type: "FILTER_TEMPERAMENTS",
    payload: temperament,
  };
};

export const filterOrigin = (filtro)=>{
  //filtra origen
  return {
    type: "FILTER_ORIGIN",
    payload: filtro
  }
}

export const orderRaza = (races)=>{
  //ordenar razas
  return{
    type:"ORDER_RACE",
  payload:races
  }
}
