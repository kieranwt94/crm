var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No authentication token provided, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if (!decoded) {
      return res.status(401).json({ msg: 'Token verification failed, authorization denied.' });
    }
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
