const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const login = async (req, res) => {
  const { email_address, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email_address: email_address }
    });
    if(!user) {
      return res.status(404).send(`User with email: ${email_address} not found.`);
    }
    bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
      if (err) {
        return res.status(500).send(err.message);
      }
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), process.env.JWT_TOKEN, {
          expiresIn: 300
        });
        res.status(200).json({
          error: false,
          message: 'Login successful.',
          token: token
        });
      } else {
        return res.status(422).send(`Wrong password.`);
      }
    });
  } catch(error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  login
}
