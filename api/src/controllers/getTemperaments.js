const {Temperament}= require("../db")
const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";

const getTemperaments = async (req, res) => { // crear base de datos  temperamentos
  try {
    const infoApi = await axios.get(URL);

    let temperamentDog = [];
    infoApi.data.forEach((arg) => {
      if (arg.temperament) {
       temperamentDog = temperamentDog.concat(arg.temperament.split(", "));
    }
    })
     temperamentDog =[ ...new Set (temperamentDog)] // sacar los repeditos
     let tempDog = temperamentDog.map((arg)=>{  // cree un array de objetos con la propiedad name
       return {name:arg}
     })
     const temperamentsDogs = await Temperament.bulkCreate(tempDog)

    return res.status(200).json(temperamentsDogs);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getTemperaments;
