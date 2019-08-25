'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define('Customers', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.STRING,
    code: DataTypes.STRING,
    isCompany: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    levelsId: DataTypes.INTEGER,
    company: DataTypes.INTEGER
  }, {});
  Customers.associate = function(models) {
    // associations can be defined here
    Customers.belongsTo(models.Levels, { as: "level", foreignKey: { name:"levelsId", field: "levelsId", allowNull: true }});
    Customers.hasMany(models.CustomersAddress, {
      foreignKey: {
        name:"customersId",
        field: "customersId",
        allowNull: true
      }
    });
  };
  return Customers;
};
