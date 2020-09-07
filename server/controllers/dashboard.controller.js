const { Brand, Customer, Order, Service } = require('../models');

const getStats = async (req, res) => {
  try {
    const totalBrands = await Brand.count();
    const totalCustomers = await Customer.count();
    const totalOrders = await Order.count();
    const totalServices = await Service.count();
    return res.status(200).json({
      stats: [
        { name: 'brands', count: totalBrands },
        { name: 'customers', count: totalCustomers },
        { name: 'orders', count: totalOrders },
        { name: 'services', count: totalServices }
      ]
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getLatestOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      limit: 10,
      order: [
          ['id', 'DESC']
      ],
      include: [
        {
          model: Brand,
          as: 'brand',
          attributes: ['name']
        },
        {
          model: Customer,
          as: 'customer',
          attributes: ['name']
        },
        {
          model: Service,
          as: 'service',
          attributes: ['name']
        }
      ]
    });
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getStats,
  getLatestOrders
}
