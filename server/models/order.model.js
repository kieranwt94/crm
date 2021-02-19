module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    brand_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    total: DataTypes.DECIMAL,
    form_data: DataTypes.JSON,
    status: DataTypes.INTEGER
  }, {})
  Order.associate = function (models) {
    Order.belongsTo(models.Brand, {
      foreignKey: 'brand_id',
      as: 'brand',
      onDelete: 'CASCADE'
    })
    Order.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'customer',
      onDelete: 'CASCADE'
    })
    Order.belongsTo(models.Service, {
      foreignKey: 'service_id',
      as: 'service',
      onDelete: 'CASCADE'
    })
  }
  return Order
}
