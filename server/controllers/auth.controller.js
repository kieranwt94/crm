const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

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
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), process.env.JWT_TOKEN, {
          expiresIn: 3600
        });
        res.status(200).json({
          error: false,
          message: 'Login successful.',
          token: token,
          user: {
            id: user.id,
            name: user.name
          }
        });
      } else {
        return res.status(422).json({ error: 'Wrong password.' });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const validateToken = async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) return res.json(false);

    const user = await User.findOne({
      where: { id: verified.id }
    });
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  login,
  validateToken
}
