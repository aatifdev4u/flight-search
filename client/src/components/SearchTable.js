import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';

function SearchTable() {
  const flightInfo = useSelector(state => state.flights)
  const { loader, flightList, flightSearchDetail, pagination, error } = flightInfo;

  const renderFLight = flightList.length > 0 && flightList.map((item, index)=>{
    return (
      <tr>
        <td>
          <img src="logo192.png" class="img-thumbnail" alt="Cinque Terre" width="50" height="50"/> 
          <strong>{item.airlineName}</strong>
          <p><small>{item.flightNumber}</small></p>
        </td>
        <td>
          <strong>{moment(item.deptartureTime).format("llll")}</strong>
          <p><small>{item.source}</small></p>
        </td>
        <td>
        <i className="fa fa-exchange" aria-hidden="true"></i>
        </td>
        <td>
          <strong>{moment(item.arrivalTime).format("llll")}</strong>
          <p><small>{item.destination}</small></p>
        </td>
        <td>
          <strong>{(moment(item.arrivalTime)).diff((moment(item.deptartureTime)), 'hours')}&nbsp;hr</strong>
          <p><small>{item.noOfStops}&nbsp; Stops</small></p>
        </td>
        <td>
          Rs{item.price}
        </td>
      </tr>
    )
  })
  
    return (
        <div className="flights-table">
          {
            loader && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )
          }
           {
            flightList.length > 0 &&
             (
                <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Total Flights: {pagination.total}</th>
                    <th>Depart</th>
                    <th></th>
                    <th>Arrive</th>
                    <th>Duration</th>
                    <th>Price Per Adult</th>
                  </tr>
                </thead>
                <tbody>
                  {renderFLight}
                  </tbody>
                </table>
              ) 
             }

             { 
             flightList.length == 0 && Object.keys(flightSearchDetail).length != 0 &&
              (
                <div className="d-flex justify-content-center py-4">
                  No Flights Found in this route!
                </div>
              )
          }
        </div>
    )
}

export default SearchTable
