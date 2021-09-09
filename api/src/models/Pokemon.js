const { DataTypes } = require('sequelize');
require('uuid')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.STRING
    },
    fuerza: {
      type: DataTypes.STRING
    },
    ataque: {
      type: DataTypes.STRING
    },
    defensa: {
      type: DataTypes.STRING
    },
    velocidad: {
      type: DataTypes.STRING
    },
    altura: {
      type: DataTypes.STRING
    },
    peso: {
      type: DataTypes.STRING
    }
  });
};
