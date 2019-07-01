import React, { Component } from 'react';
import Calender from './Calender';

class DateRange extends Component {
  constructor(){
    super();
    this.date = new Date();

    this.state = {
      icon: true,
      calender: false,
      startDate: "",
      endDate: "",
    }
  }

  handleClick = () => {
    this.setState({ calender: true });
  }

  mouseEnter = () => {
    if(this.state.startDate && this.state.endDate){
      this.setState({ icon: !this.state.icon });
    }
  }

  handleMouseLeave = () => {
    this.mouseEnter();
  }

  handleClear = () => {
    this.setState({ icon: true, startDate: "", endDate: "" });
  }

  handleChage = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  setDate = (data, name) => {
  	// console.log(data, name);
    console.log(new Date(data), 'date range local date...');

  	if(data && name) {
      if(name === "endDate"){
        console.log(name, 'name');
        if(this.state.startDate){
          if(new Date(data) > new Date(this.state.startDate)){
            console.log(`%c ${this.state.startDate} ${this.state.endDate} date range`, "color: red");
            this.setState({ endDate: data });
          }
        }
      } else {
        this.setState({ startDate: data });
      }
    }
  }

  hideCalender = () => {
  	this.setState({ calender: false });
  }


  render() {
    // console.log(this.state);
    // console.log(this.state.endDate, "inside daterange rndr...");
    return (
      <div className="date-range" >
        <div 
          className="input-box range-input-box"
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={ this.handleClick }
          >
          <input
            type="text"
            className="range-input"
            placeholder="Start Date"
            name="startDate"
            value={ this.state.startDate }
            onChange={ this.handleChage }
            />
          <span> ~ </span>
          <input type="text" className="range-input" placeholder="End Date" name="endDate" value={ this.state.endDate } onChange={ this.handleChage } />
            {
              this.state.icon ?
                <i className="far fa-calendar"></i>
              : <i className="fas fa-times-circle" onClick={this.handleClear}></i>
            }
	      </div>
	        {
	          this.state.calender ?
		          <div style={{display: "flex"}}>
		            <Calender hideCalender={this.hideCalender} name="startDate" today={this.setDate}/>
		            <Calender hideCalender={this.hideCalender} name="endDate" today={this.setDate}/>
		          </div>
	          : null
	        }
	    </div>
    );
  }
}

export default DateRange;

