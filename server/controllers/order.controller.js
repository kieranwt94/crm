const { Order, Brand, Customer, Service } = require('../models')

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
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
    })
    return res.status(200).json({ orders })
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params
    const order = await Order.findOne({
      where: { id: id }
    })
    if (order) {
      return res.status(200).json({ order })
    }
    res.status(404)
    const error = new Error(`Order with id: ${id} not found.`)
    next(error)
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body)
    return res.status(201).json({ message: 'Order has been created.', order: order })
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    const [updated] = await Order.update(req.body, {
      where: { id: id }
    })
    if (updated) {
      const updatedOrder = await Order.findOne({ where: { id: id } })
      return res.status(200).json({ message: `Order id: ${id} has been updated.`, order: updatedOrder })
    }
    res.status(404)
    const error = new Error(`Order with id: ${id} not found.`)
    next(error)
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    const deleted = await Order.destroy({
      where: { id: id }
    })
    if (deleted) {
      return res.status(200).json({ message: `Order id: ${id} has been deleted.`, order: deleted })
    }
    res.status(404)
    const error = new Error('Order not found')
    next(error)
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
}
