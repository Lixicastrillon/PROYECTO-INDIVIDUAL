const { Router } = require('express');
// Importar todos los routers;
const getDogs = require("../controllers/getDogs")
const getDogId = require('../controllers/getDogId');
const getTemperaments = require("../controllers/getTemperaments")
const postDogs = require ("../controllers/postDogs")



const router = Router();
// Configurar los routers
router.get("/dogs",getDogs)
router.get("/dogs/:idRaza",getDogId)
router.get("/temperament", getTemperaments)
router.post("/dogs",postDogs)


module.exports = router;
