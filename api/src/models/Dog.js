const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog',{
    id:{
        type : DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4 // algoritmo que me genera un UUID aleatorio
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        set(value){
            this.setDataValue("name", value.toLowerCase());
        },
    },
    height:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    life_span:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{ timestamps: false })
}