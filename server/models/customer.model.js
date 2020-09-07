module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    email_address: DataTypes.STRING
  }, {});
  Customer.associate = function (models) {
    Customer.hasMany(models.Order, {
      foreignKey: 'customer_id',
      as: 'orders',
      onDelete: 'CASCADE',
    });
  };
  return Customer;
};
