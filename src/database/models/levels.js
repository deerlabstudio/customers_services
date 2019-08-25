'use strict';
module.exports = (sequelize, DataTypes) => {
  const Levels = sequelize.define('Levels', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    discount: DataTypes.FLOAT,
    company: DataTypes.INTEGER
  }, {});
  Levels.associate = function(models) {
    // associations can be defined here
    Levels.hasMany(models.Customers, {
      foreignKey: {
        name:"levelsId",
        field: "levelsId",
        allowNull: true
      }
    });
  };
  return Levels;
};
