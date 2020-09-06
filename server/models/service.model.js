module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        name: DataTypes.STRING,
    }, {});
    Service.associate = function (models) {
        Service.hasMany(models.Order, {
            foreignKey: 'service_id',
            as: 'orders',
            onDelete: 'CASCADE',
        });
    };
    return Service;
};