const { validate } = require("uuid");

const initialState = {
  Dogs: [],
  detail: {},
  temperament: [],
  copyDogs: [],
};

const reducer = (state = initialState, action) => {
  // todos los perros
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        Dogs: action.payload,
        copyDogs: action.payload,
      };
    case "GET_DOG":
      return {
        ...state,
        Dogs: action.payload,
      };
    case "GET_DOGID":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperament: action.payload.sort((a, b) =>
          a.name.localeCompare(b.name)
        ), // compara string en orden alfabetico
      };
    case "FILTER_TEMPERAMENTS":
      const filteredTemperament = state.copyDogs.filter(
        (arg) =>
          arg.temperament &&
          arg.temperament.toLowerCase().includes(action.payload)
      );
      return {
        ...state,
        Dogs: filteredTemperament,
      };

    case "FILTER_ORIGIN":
      const filterOrigin = state.copyDogs.filter((arg) => {
        if (action.payload === "dataBase") {
          return validate(arg.id);
        } else {
          return !validate(arg.id);
        }
      });
      return {
        ...state,
        Dogs: filterOrigin,
      };
    case "ORDER_RACE":
      const orderRaza = state.Dogs.sort((a, b) => {
            if(action.payload === "Upward"){
              return  a.name.localeCompare(b.name);
            }else{
              return b.name.localeCompare(a.name)
            }
      });    
      return {
        ...state,
        Dogs:orderRaza,
      }

    default:
      return { ...state };
  }
};

export default reducer;
