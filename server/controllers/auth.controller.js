const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const getAuthUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ msg: `Something went wrong. Please try again later.` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const login = async (req, res) => {
  try {
    const { email_address, password } = req.body;
    if (!email_address || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    const user = await User.findOne({
      where: { email_address: email_address }
    });
    if(!user) {
      return res.status(404).json({ msg: `User with email: ${email_address} not found.` });
    }
    bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
          name: user.name,
          role: user.role
        }
      };

      jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: 360000, }, (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        },
      );
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const logout = async (req, res) => {

}

module.exports = {
  login,
  logout,
  getAuthUser
}
