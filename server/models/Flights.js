const mongoose = require('mongoose');

const flightSchema = mongoose.Schema({
    flightNumber: {
        type: String
    },
    airlineName: {
        type: String
    },
    source : {
        type: String
    },
    destination:{
        type: String
    },
    duration:{
        type: String
    },
    noOfStops:{
        type: Number
    },
    price:{
        type: Number
    },
    deptartureTime:{
        type: Date          
    },
    arrivalTime:{
        type: Date          
    }
})

const Flights = mongoose.model('Flights', flightSchema);

module.exports = { Flights }
