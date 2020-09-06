const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require("path"); 
const cors = require('cors'); 
const rateLimit = require("express-rate-limit");

const environment = process.env.NODE_ENV;
const app = express();
const port = process.env.PORT || 5000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100
});

const brandRoutes = require('./routes/brand.routes');
const customerRoutes = require('./routes/customer.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const orderRoutes = require('./routes/order.routes');
const serviceRoutes = require('./routes/service.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json());

app.use(express.urlencoded({
    extended: false
}));

app.use(limiter);

if (environment !== 'production') {
    app.use(logger('dev'));
} 

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/api/brands', brandRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});