const express = require('express');
const cors = require('cors');

/** Express App */
const app = express();

/** Middlewares */
const errorHandler = require('./middlewares/error-handler');

/** controllers */
const HealthCheckController = require('./controllers/HealthCheck');
const LevelsController = require('./controllers/Levels');
const CustomersController = require('./controllers/Customers');
const CustomersAddressController = require('./controllers/CustomersAddress');

app.use(express.json());
app.use(cors());
app.use(new HealthCheckController(express.Router()).router);
app.use(new LevelsController(express.Router()).router);
app.use(new CustomersController(express.Router()).router);
app.use(new CustomersAddressController(express.Router()).router);
app.use(errorHandler());

module.exports = app;
