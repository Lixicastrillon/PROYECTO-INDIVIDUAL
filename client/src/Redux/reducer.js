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
      if (action.payload === "allDogs") {
        return {
          ...state,
          Dogs: state.copyDogs,
        };
      } else {
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
      }
    case "ORDER_RACE":
      const races = [...state.copyDogs];
      return {
        ...state,
        Dogs: races.sort((a, b) => {
          if (action.payload === "Upward") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        }),
      };
    case "ALL_Dogs":
      if (action.payload === "allDogs") {
        return {
          ...state,
          Dogs: state.copyDogs,
        };
      }

    case "ORDER_WEIGHT":
      const weight = [...state.copyDogs];
      return {
        ...state,
        Dogs: weight.sort((a, b) => {
          if (action.payload === "Upward") {
            if (
              Number(a.weight.metric.toString().split(" - ")[0]).toString() !==
              "NaN"
            ) {
              return (
                Number(a.weight.metric.toString().split(" - ")[0]) -
                  Number(b.weight.metric.toString().split(" - ")[0]) ||
                Number(a.weight.metric.toString().split(" - ")[1]) -
                  Number(b.weight.metric.toString().split(" - ")[1])
              );
            }
            return -1;
          } else {
            if (
              Number(b.weight.metric.toString().split(" - ")[0]).toString() !==
              "NaN"
            ) {
              return (
                Number(b.weight.metric.toString().split(" - ")[0]) -
                  Number(a.weight.metric.toString().split(" - ")[0]) ||
                Number(b.weight.metric.toString().split(" - ")[1]) -
                  Number(a.weight.metric.toString().split(" - ")[1])
              );
            }
            return -1;
          }
        }),
      };

    case "POST_DOGS":
      return {
        ...state,
        Dogs: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
