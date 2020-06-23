import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import SearchFilter from './components/SearchFilter'
import SearchTable from './components/SearchTable'
import Pagination from './components/PaginationComp'


class App extends React.Component{
  render(){
    return (
      <div>
        <div className="fixed-navbar-top">
          <SearchFilter/>
        </div>
        <div className="flights-table-list">
          <SearchTable/>
        </div>
        <Pagination/>
      </div>
    );
  }
}


export default App;
