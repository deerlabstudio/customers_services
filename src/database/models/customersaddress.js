'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomersAddress = sequelize.define('CustomersAddress', {
    first_line: DataTypes.STRING,
    second_line: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    default: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    customersId: DataTypes.INTEGER
  }, {});
  CustomersAddress.associate = function(models) {
    // associations can be defined here
    CustomersAddress.belongsTo(models.Customers, { as: "address", foreignKey: { name:"customersId", field: "customersId", allowNull: true }});
  };
  return CustomersAddress;
};
