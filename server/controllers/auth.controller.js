const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { roles } = require('../roles');

const getAuthUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500);
    next(error.message);
  }
}

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    const error = new Error('No authentication token provided, authorization denied.');
    res.status(401);
    next(error);
  }
}

const checkTokenSetUser = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    const error = new Error('No authentication token provided, authorization denied.');
    res.status(401);
    next(error);
  }

  try {
    await jwt.verify(token, process.env.JWT_TOKEN, (error, decoded) => {
      if (error) {
        const error = new Error('Token verification failed, authorization denied.');
        res.status(500);
        next(error);
      }
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    res.status(500);
    next(error.message);
  }
}

const grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        res.status(401);
        const error = new Error('You do not have sufficient permissions to access this resource.');
        next(error);
      }
      next();
    } catch (error) {
      res.status(500);
      next(error.message);
    }
  }
}

const register = async (req, res, next) => {
  try {
    const { name, email_address, password, role } = req.body;
    const user = await User.findOne({
      where: { email_address: email_address },
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.status(400);
      const error = new Error(`User with email: ${email_address} already exists.`);
      next(error);
    }
    const newUser = await User.create({
      name: name,
      password: password,
      email_address: email_address,
      role: role || 'guest'
    });
    res.status(200).json({
      data: {
        id: newUser.id,
        name: newUser.name,
        email_address: newUser.email_address,
        role: newUser.role
      },
      message: 'You have signed up successfully.'
    });
  } catch (error) {
    res.status(500);
    next(error.message);
  }
}

const login = async (req, res, next) => {
  try {
    const { email_address, password } = req.body;
    if (!email_address || !password) {
      res.status(400);
      const error = new Error('Not all fields have been entered.');
      next(error);
    }
    const user = await User.findOne({
      where: { email_address: email_address }
    });
    if (!user) {
      res.status(404);
      const error = new Error(`User with email: ${email_address} not found.`);
      next(error);
    }
    bcrypt.compare(password, user.password, function (error, isMatch) {
      if (error) {
        res.status(500);
        next(error.message);
      }
      if (isMatch) {
        const payload = {
          user: {
            id: user.id,
            name: user.name,
            role: user.role,
            email_address: user.email_address
          }
        };

        jwt.sign( payload, process.env.JWT_TOKEN, { expiresIn: '1d' }, (error, token) => {
          if(error) {
            res.status(500);
            next(error.message);
          }
          res.status(200).json({
            token
          });
        });
      } else {
        res.status(400);
        const error = new Error('Incorrect credentials.');
        next(error);
      }
    });
  } catch (error) {
    res.status(500);
    next(error.message);
  }
}

const logout = async (req, res, next) => {

}

module.exports = {
  isLoggedIn,
  checkTokenSetUser,
  grantAccess,
  getAuthUser,
  register,
  login,
  logout
}
