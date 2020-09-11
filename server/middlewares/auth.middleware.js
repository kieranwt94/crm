var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'No authentication token provided, authorization denied.' });
    }

    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) {
      return res.status(401).json({ msg: 'Token verification failed, authorization denied.' });
    }

    req.user = verified.id;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
