const { User } = require('../models');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    return res.status(200).json({ users });
  } catch (error) {
    res.status(500);
    next(error.message);
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id: id },
      attributes: { exclude: ['password'] }
    });
    if (user) {
      return res.status(200).json({ user });
    }
    res.status(404);
    const error = new Error(`User with id: ${id} not found.`);
    next(error);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({ message: 'User has been created.', user: user });
  } catch (error) {
    res.status(500);
    next(error.message);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id: id } });
      return res.status(200).json({ message: `User id: ${id} has been updated.`, user: updatedUser });
    }
    res.status(404);
    const error = new Error(`User with id: ${id} not found.`);
    next(error);
  } catch (error) {
    res.status(500);
    next(error.message);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.status(200).json({ message: `User id: ${id} has been deleted.`, user: deleted });
    }
    res.status(404);
    const error = new Error('User not found');
    next(error);

  } catch (error) {
    res.status(500);
    next(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
