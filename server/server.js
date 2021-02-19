/* Libraries */
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

/* Routes */
const authRoutes = require('./routes/auth.routes')
const brandRoutes = require('./routes/brand.routes')
const customerRoutes = require('./routes/customer.routes')
const dashboardRoutes = require('./routes/dashboard.routes')
const orderRoutes = require('./routes/order.routes')
const serviceRoutes = require('./routes/service.routes')
const userRoutes = require('./routes/user.routes')

/* Error Handling */
const errors = require('./config/errors')

require('dotenv').config()

const environment = process.env.NODE_ENV
const app = express()
const port = process.env.PORT || 5000

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

if (environment !== 'production') {
  app.use(logger('dev'))
}

app.get('/', (req, res) => {
  res.send('BSQ Group - API')
})

app.use('/auth', authRoutes)
app.use('/brands', brandRoutes)
app.use('/customers', customerRoutes)
app.use('/orders', orderRoutes)
app.use('/services', serviceRoutes)
app.use('/users', userRoutes)
app.use('/dashboard', dashboardRoutes)

app.use(errors.notFound)
app.use(errors.errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
