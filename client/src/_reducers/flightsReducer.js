import {
   GET_FLIGHTS_SUCCESS,
   GET_FLIGHTS_FAIL,
   LOADING_FLIGHTS
} from '../_actions/types';

const intialState = {
    loader: false,
    flightSearchDetail: {},
    flightList: [],
    pagination: {},
    error: ''
}

export default function(state={...intialState},action){
    switch(action.type){
        case LOADING_FLIGHTS: 
            return {
                ...state,
                flightSearchDetail: action.payload,
                loader: true,
                error: ''
            }
        case GET_FLIGHTS_SUCCESS:
            return {
                ...state,
                flightList: action.payload.data,
                pagination: action.payload.pagination,
                loader: false,
                error: ''
            }
        case GET_FLIGHTS_FAIL:
            return {
                ...state,
                flightList: [],
                pagination: {},
                loader: false,
                error: action.payload
            }
        default:
            return state;
    }
}