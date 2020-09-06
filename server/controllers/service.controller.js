const { Service } = require('../models');

const getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        return res.status(200).json({ services });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findOne({
            where: { id: id }
        });
        if (service) {
            return res.status(200).json({ service });
        }
        return res.status(404).send(`Service with id: ${id} not found.`);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        return res.status(201).json({
            service
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Service.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedService = await Service.findOne({ where: { id: id } });
            return res.status(200).json({ service: updatedService });
        }
        throw new Error('Service not found.');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Service.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("Service deleted.");
        }
        throw new Error("Service not found.");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
}