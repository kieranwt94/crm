/* Libraries */
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

/* Routes */
const authRoutes = require('./routes/auth.routes');
const brandRoutes = require('./routes/brand.routes');
const customerRoutes = require('./routes/customer.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const orderRoutes = require('./routes/order.routes');
const serviceRoutes = require('./routes/service.routes');
const userRoutes = require('./routes/user.routes');

require('dotenv').config();

const environment = process.env.NODE_ENV;
const app = express();
const port = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

/* Not found */
const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

/* Error handler */
const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (environment !== 'production') {
  app.use(logger('dev'));
}

app.use('/api/auth', authRoutes);
app.use(limiter);
app.use('/api/brands', brandRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
