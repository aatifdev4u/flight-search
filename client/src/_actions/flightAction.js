import { 
    GET_FLIGHTS_START,
    GET_FLIGHTS_SUCCESS,
    GET_FLIGHTS_FAIL,
    LOADING_FLIGHTS
 } from './types';
import axios from 'axios';

function loadingFlights(flightSearchDetail){
    return { 
        type: LOADING_FLIGHTS,
        payload: flightSearchDetail
    }
}

function fetchedFlights(flights){
    return {
        type: GET_FLIGHTS_SUCCESS,
        payload: flights
    }
}

function fetchedFlightFail(err){
    return {
        type: GET_FLIGHTS_FAIL,
        payload: err
    }
}


export function getFlights(data) {
    return (dispatch) => {
      dispatch(loadingFlights(data))
  
      axios.post('http://localhost:5000/api/flight/get_flights',data)
        .then(response => {
            dispatch(fetchedFlights(response.data))
        })
        .catch(err => {
            dispatch(fetchedFlightFail(err))
        })
    }
  }