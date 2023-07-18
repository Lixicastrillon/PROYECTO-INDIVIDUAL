const {DataTypes} = require ('sequelize')

module.exports = (sequelize)=>{

    sequelize.define('Temperament',{
            id:{
                type : DataTypes.UUID,
                primaryKey:true,
                defaultValue:DataTypes.UUIDV4 // algoritmo que me genera un UUID aleatorio
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false,
                set(value){
                    this.setDataValue("name", value.toLowerCase());
                },
            },
        },{ timestamps: false })
    }
