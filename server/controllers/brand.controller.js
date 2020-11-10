const { Brand } = require('../models');

const getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.findAll();
    return res.status(200).json({ brands });
  } catch (error) {
    res.status(500);
    next(error.message);
  }
}

const getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findOne({
      where: { id: id }
    });
    if (brand) {
      return res.status(200).json({ brand });
    }
    res.status(404);
    const error = new Error(`Brand with id: ${id} not found.`);
    next(error);
  } catch (error) {
    res.status(500);
    next(error.message);
  }
}

const createBrand = async (req, res, next) => {
  try {
    const brand = await Brand.create(req.body);
    return res.status(201).json({ message: 'Brand has been created.', brand: brand });
  } catch (error) {
    res.status(500);
    next(error.message);
  }
}

const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [updated] = await Brand.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedBrand = await Brand.findOne({ where: { id: id } });
      return res.status(200).json({ message: `Brand id: ${id} has been updated.`, brand: updatedBrand });
    }
    res.status(404);
    const error = new Error(`Brand with id: ${id} not found.`);
    next(error);
  } catch (error) {
    res.status(500);
    next(error.message);
  }
};

const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Brand.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.status(200).json({ message: `Brand id: ${id} has been deleted.`, brand: deleted });
    }
    res.status(404);
    const error = new Error('Brand not found');
    next(error);
  } catch (error) {
    res.status(500);
    next(error.message);
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
}
