import React, { useState} from 'react';
import Pagination from "react-js-pagination";
import { useSelector, useDispatch } from 'react-redux';
import { getFlights } from '../_actions/flightAction';

function PaginationComp() {
  const flightInfo = useSelector(state => state.flights)
  const { flightSearchDetail, pagination, flightList } = flightInfo;
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1)

  if(pagination.total <= pagination.pageLimit || flightList.length == 0){
    return null;
  }

  console.log(pagination);
  console.log(flightSearchDetail);

  
  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber)
    let { origin, destination, originDate, destinationDate, pageLimit } = flightSearchDetail;
    let payload = {
      origin,
      destination,
      originDate,
      destinationDate,
      page : pageNumber,
      pageLimit
    }
    dispatch(getFlights(payload))
  }

    return (
        <div>
          <Pagination
            // hideNavigation
            activePage={activePage}
            itemsCountPerPage={pagination.pageLimit}
            totalItemsCount={pagination.total}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
      </div>
    )
}

export default PaginationComp
