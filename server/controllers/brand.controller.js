const { Brand } = require('../models');

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll();
    return res.status(200).json({ brands });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findOne({
      where: { id: id }
    });
    if (brand) {
      return res.status(200).json({ brand });
    }
    return res.status(404).json({ msg: `Brand with id: ${id} not found.` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const createBrand = async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    return res.status(201).json({ msg: 'Brand has been created.', brand: brand });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Brand.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedBrand = await Brand.findOne({ where: { id: id } });
      return res.status(200).json({ msg: `Brand id: ${id} has been updated.`, brand: updatedBrand });
    }
    return res.status(404).json({ msg: `Brand with id: ${id} not found.` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Brand.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.status(200).json({ msg: `Brand id: ${id} has been deleted.`, brand: deleted });
    }
    return res.status(404).json({ msg: 'Brand not found.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
}
