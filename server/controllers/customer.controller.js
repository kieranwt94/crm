const { Customer } = require('../models');

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        return res.status(200).json({ customers });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findOne({
            where: { id: id }
        });
        if (customer) {
            return res.status(200).json({ customer });
        }
        return res.status(404).send(`Customer with id: ${id} not found.`);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        return res.status(201).json({
            customer
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Customer.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedCustomer = await Customer.findOne({ where: { id: id } });
            return res.status(200).json({ customer: updatedCustomer });
        }
        throw new Error('Customer not found.');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Customer.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("Customer deleted.");
        }
        throw new Error("Customer not found.");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}