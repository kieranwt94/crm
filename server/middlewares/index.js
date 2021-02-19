const jwt = require('jsonwebtoken')

module.exports = async function (req, res, next) {
  const token = req.header('x-auth-token')

  if (!token) {
    const error = new Error('No authentication token provided, authorization denied.')
    res.status(401)
    next(error)
  }

  try {
    await jwt.verify(token, process.env.JWT_TOKEN, (error, decoded) => {
      if (error) {
        const error = new Error('Invalid token, authorization denied.')
        res.status(401)
        next(error)
      } else {
        req.user = decoded.user
        next()
      }
    })
  } catch (error) {
    res.status(500)
    next(error.message)
  }
}
