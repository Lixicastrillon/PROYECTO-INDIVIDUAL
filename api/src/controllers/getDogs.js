const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";
const { Op } = require("sequelize");
const { Dog } = require("../db");
const { Temperament } = require("../db");

const getDogs = async (req, res) => {
  try {
    
    const { name } = req.query;
    
    if (name) {
      const { data } = await axios.get(URL); // petición  a la API
      const dataName = data.filter((arg) => {
        if (arg.name.toLowerCase().includes(name.toLowerCase())) {
          return arg.name;
        }
      });
      if (!dataName.length) {
        const findName = await Dog.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          include: {
            model: Temperament,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        });
        let dogs = findName.map((arg) => {
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

        if (!dogs.length) {
          return res.status(404).send("the race does not exist");
        }
        return res.status(200).json(dogs);
      } else {
        return res.status(200).json(dataName);
      }
      //------------------ todos los perros
    } else {
      const { data } = await axios.get(URL); // petición a la Api para que renderice la info de los perros

      const findName = await Dog.findAll({
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      let dogs = findName.map((arg) => {
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
      const names = data.concat(dogs);
      return res.status(200).json(names);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

module.exports = getDogs;
