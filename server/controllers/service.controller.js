const { Service } = require('../models')

const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.findAll()
    return res.status(200).json({ services })
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params
    const service = await Service.findOne({
      where: { id: id }
    })
    if (service) {
      return res.status(200).json({ service })
    }
    res.status(404)
    const error = new Error(`Service with id: ${id} not found.`)
    next(error)
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body)
    return res.status(201).json({ message: 'Service has been created.', service: service })
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

const updateService = async (req, res, next) => {
  try {
    const { id } = req.params
    const [updated] = await Service.update(req.body, {
      where: { id: id }
    })
    if (updated) {
      const updatedService = await Service.findOne({ where: { id: id } })
      return res.status(200).json({ message: `Service id: ${id} has been updated.`, service: updatedService })
    }
    res.status(404)
    const error = new Error(`Service with id: ${id} not found.`)
    next(error)
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params
    const deleted = await Service.destroy({
      where: { id: id }
    })
    if (deleted) {
      return res.status(200).json({ message: `Service id: ${id} has been deleted.`, service: deleted })
    }
    res.status(404)
    const error = new Error('Service not found')
    next(error)
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
}
