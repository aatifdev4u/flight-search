import { combineReducers } from 'redux';
import flights from './flightsReducer';

const rootReducer = combineReducers({
    flights
});

export default rootReducer;