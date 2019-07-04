import React, { Component } from 'react';
// import { Date } from 'my-react-date-picker';

import './App.css';
import DateRange from './DateRange';
// import "my-react-date-picker/dist/react-datepicker.css";

class App extends Component {
  
  render(){
    return (
      <div className="app" >
      	{ /* <Date /> */ }
        <DateRange />
      </div>
    )
  }
}

export default App;
