module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: DataTypes.STRING,
    colour: DataTypes.STRING
  }, {})
  Brand.associate = function (models) {
    Brand.hasMany(models.Order, {
      foreignKey: 'brand_id',
      as: 'orders',
      onDelete: 'CASCADE'
    })
  }
  return Brand
}
