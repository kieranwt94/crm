const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const environment = process.env.NODE_ENV;
const app = express();
const port = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const authRoutes = require('./routes/auth.routes');
const brandRoutes = require('./routes/brand.routes');
const customerRoutes = require('./routes/customer.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const orderRoutes = require('./routes/order.routes');
const serviceRoutes = require('./routes/service.routes');
const userRoutes = require('./routes/user.routes');

const authMiddlewares = require('./middlewares/auth.middleware');

app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (environment !== 'production') {
  app.use(logger('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello World.');
});

app.use('/api/auth', authRoutes);
app.use(authMiddlewares);
app.use('/api/brands', brandRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
