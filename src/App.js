import React, { Component } from 'react';
// import DatePicker from "my-react-date-picker";

import './App.css';
import DateRange from './DateRange';
// import "my-react-date-picker/dist/react-datepicker.css";

class App extends Component {
  
  render(){
    return (
      <div className="app" >
      	{ /* <DatePicker /> */ }
        <DateRange />
      </div>
    )
  }
}

export default App;
