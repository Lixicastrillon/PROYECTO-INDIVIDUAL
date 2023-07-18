const { Temperament, Dog } = require("../db");

const postDogs = async (req, res) => {
  try {
    const { image, name, height, weight, life_span, id } = req.body;

    if (!image || !name || !height || !weight || !life_span || !id.length) {
      return res.status(400).send("Missing data please fill in the required fields");
    }
    let temperamentSaved = await Promise.all(
      id.map(async (id) => {
        // sirve para que .map funcione de forma asincrona
        return await Temperament.findByPk(id);
        
      })
    );

    if (!temperamentSaved.length) {
      return res.status(400).send("temperament does not exist");
    }
    let createdDog = await Dog.create({
      image,
      name,
      height,
      weight,
      life_span,
    });

    temperamentSaved.forEach((arg) => {
      createdDog.addTemperament(arg);
    });
    return res.status(200).json(createdDog);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = postDogs;
