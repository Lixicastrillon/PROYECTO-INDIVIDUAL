const { validate } = require("uuid");
const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getDogId = async (req, res) => {
  try {
    const { idRaza } = req.params; 

    const { data } = await axios.get("https://api.thedogapi.com/v1/breeds"); //  petición  a la API

    const dataId = data.filter((arg) => {
      if (arg.id.toString() === idRaza) {
        return idRaza;
      }
    });
    if (dataId.length) {
      return res.status(200).json(dataId[0]);
    }
    if (validate(idRaza)) {
      let databaseId = await Dog.findAll({
        where: {
          id: idRaza,
        },
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      let dogs = databaseId.map((arg) => {
        // recorre todos los perros de la base de datos
        const dog = arg.get({ plain: true }); // guardar los datos planos
        return {
          ...dog,
          height: { metric: dog.height },
          weight: { metric: dog.weight },
          image: { url: dog.image },
          temperament: dog.Temperaments.reduce((acc, name) => {
            acc = name.name + ", " + acc;
            return acc;
          }, ""),
        };
      });
      return res.status(200).json(dogs[0]);
    } else {
      return res.status(404).send("can not found a dog with this id");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getDogId;
