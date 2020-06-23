import React, { useState} from 'react'
import DatePicker from 'react-datepicker';
import { Typeahead } from 'react-bootstrap-typeahead'; 
import { originData } from '../utils/mockdata';
import { useSelector, useDispatch } from 'react-redux'
import { getFlights } from '../_actions/flightAction';

function SearchFilter() {
  const [multiple, setMultiple] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [originDate, setOriginDate] = useState();
  const [destinationDate, setDestinationtDate] = useState();
  const [srcErrMsg, setSrcErrMsg] = useState('');
  const [destErrMsg, setDestErrMsg] = useState('');
  const [srcDtErrMsg, setSrcDtErrMsg] = useState('');
  const [isvalid, setIsvalid] = useState(true)

  const dispatch = useDispatch();
  
  const options = ["Akola", "Ahmedabad", "Lucknow", "Ludhiana", "Bangalore", "Bhubaneswar", "Ranchi", "Chennai", "Goa", "Dhanbad", "Hyderabad"];

  const handleSubmit = ()=>{
    console.log('handle Submit is called');
    if(!origin){
      setIsvalid(false);
      setSrcErrMsg('Please Select Source');
    }

    if(!destination){
      setIsvalid(false);
      setDestErrMsg('Please Select Destination');
    }

    if((JSON.stringify(origin)==JSON.stringify(destination)) && origin !== "" && destination !== ""){
      setIsvalid(false);
      setSrcErrMsg('Source and destination same');
      setDestErrMsg('Source and destination same');
    }

    if(!originDate){
      setIsvalid(false);
      setSrcDtErrMsg('Please Select Date');
    }

    let payload = {
      origin: origin.toString(),
      destination: destination.toString(),
      originDate,
      destinationDate,
      page : 1,
      pageLimit: 5
    };

    console.log(payload);
    console.log({isvalid});
    if(isvalid){
      dispatch(getFlights(payload))
      
    }
    
  }

  return (
    <div className=" search-filter">
        <div className="search-filter-item flight-icon">
          <i className="fa fa-plane" aria-hidden="true"></i>
          {/* <p>Flight Search</p> */}
        </div>
        <div className="search-filter-item">
          <small className="text-white">From<i>*</i></small>
          <div>
            <Typeahead
              id="basic-typeahead-example"
              labelKey="origin"
              multiple={multiple}
              onChange={setOrigin}
              options={options}
              placeholder="Select Origin"
              selected={origin}
            />
            {!isvalid &&  <small className="error-msg">{srcErrMsg} </small>}
        </div>
      </div>
      <div className="search-filter-item">
      <small className="text-white">To <i>*</i></small>
        <div>
          <Typeahead
              id="basic-typeahead-example"
              labelKey="destination"
              multiple={multiple}
              onChange={setDestination}
              options={options}
              placeholder="Select Destination"
              selected={destination}
            />
            {!isvalid && <small className="error-msg">{destErrMsg}</small>}
        </div>
      </div>
      <div className="search-filter-item">
        <small className="text-white">Travel Date <i>*</i></small>
        <div>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={originDate}
            onChange={setOriginDate}
            className="form-control"
          />
           {!isvalid && <small className="error-msg">{srcDtErrMsg}</small>}
        </div>
      </div>
      <div className="search-filter-item">
        <small className="text-white">Return Date</small>
        <div>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={destinationDate}
            onChange={setDestinationtDate}
            className="form-control"
          />
        </div>
      </div>
      <div className="search-filter-item ">
        <button className="btn search-box" onClick={handleSubmit}>Search</button>
      </div>
    </div>
  )
}

export default SearchFilter

