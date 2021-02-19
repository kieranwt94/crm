const { Customer } = require('../models')

const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.findAll()
    return res.status(200).json({ customers })
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params
    const customer = await Customer.findOne({
      where: { id: id }
    })
    if (customer) {
      return res.status(200).json({ customer })
    }
    res.status(404)
    const error = new Error(`Customer with id: ${id} not found.`)
    next(error)
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

const createCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.create(req.body)
    return res.status(201).json({ message: 'Customer has been created.', customer: customer })
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

const updateCustomer = async (req, res, next) => {
  try {
    const { id } = req.params
    const [updated] = await Customer.update(req.body, {
      where: { id: id }
    })
    if (updated) {
      const updatedCustomer = await Customer.findOne({ where: { id: id } })
      return res.status(200).json({ message: `Customer id: ${id} has been updated.`, customer: updatedCustomer })
    }
    res.status(404)
    const error = new Error(`Customer with id: ${id} not found.`)
    next(error)
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params
    const deleted = await Customer.destroy({
      where: { id: id }
    })
    if (deleted) {
      return res.status(200).json({ message: `Customer id: ${id} has been deleted.`, customer: deleted })
    }
    res.status(404)
    const error = new Error('Brand not found')
    next(error)
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
}
