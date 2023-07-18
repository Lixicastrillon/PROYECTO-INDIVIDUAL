require('dotenv').config();
const { Sequelize } = require('sequelize');
const DogModel = require ('./models/Dog')//importamos para ejercutar los modelos
const TemperamentModel= require('./models/Temperament')
const Dog_TemperamentModel= require('./models/Dog_Temperament')
const fs = require('fs');//file system - obtener info de un archivo
const path = require('path');// saca las rutas de los archivos
const { DB_USER, DB_PASSWORD, DB_HOST} = process.env;// importe datos desde el archivo .env
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Inyectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// la función de los modelos para su ejecucion con sequelize
DogModel(sequelize)
TemperamentModel(sequelize)
Dog_TemperamentModel(sequelize)


// Para relacionarlos hacemos un destructuring
const { Dog,Temperament, Dog_Temperament} = sequelize.models;


// Aca vendrian las relaciones
Dog.belongsToMany(Temperament,{through:Dog_Temperament});
Temperament.belongsToMany(Dog,{through:Dog_Temperament});
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
