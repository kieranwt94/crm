const { Order, Brand, Customer, Service } = require('../models');

const getAllOrders = async (req, res) => {
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
        });
        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findOne({
            where: { id: id }
        });
        if (order) {
            return res.status(200).json({ order });
        }
        return res.status(404).send(`Order with id: ${id} not found.`);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        return res.status(201).json({
            order
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Order.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedOrder = await Order.findOne({ where: { id: id } });
            return res.status(200).json({ order: updatedOrder });
        }
        throw new Error('Order not found.');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Order.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("Order deleted.");
        }
        throw new Error("Order not found.");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}