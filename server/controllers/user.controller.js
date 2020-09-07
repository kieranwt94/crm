const { User } = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id: id },
      attributes: { exclude: ['password'] }
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).json({ msg: `User with id: ${id} not found.` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({ msg: 'User has been created.', user: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id: id } });
      return res.status(200).json({ msg: `User id: ${id} has been updated.`, user: updatedUser });
    }
    return res.status(404).json({ msg: `User with id: ${id} not found.` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.status(200).json({ msg: `User id: ${id} has been deleted.`, user: deleted });
    }
    return res.status(404).json({ msg: 'User not found.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
