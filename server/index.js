const express = require('express');
const PORT = process.env.PORT || 5000;
const morgan = require('morgan');
const cors = require('cors');
const path = require("path");

const app = express();

// intilise middleware
app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// database connection
require('./database');

// connecting to routes
app.use("/api/flight", require('./routes/flights'));

// listening on port
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT} successfully...`)
})