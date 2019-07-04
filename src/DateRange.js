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

    if(data && name) {
       if(name === "endDate" && this.state.startDate ){
         if((new Date(data).getFullYear() >= new Date(this.state.startDate).getFullYear() && new Date(data).getMonth() >= new Date(this.state.startDate).getMonth() && new Date(data).getDate() > new Date(this.state.startDate).getDate()) || new Date(data) > new Date(this.state.startDate)){
           this.setState({ endDate: data });
         }
       } else if(name === "endDate" && !this.state.startDate){
          this.setState({ endDate: data });
       } else if(name === "startDate" && this.state.endDate){
          if((new Date(data).getFullYear() <= new Date(this.state.endDate).getFullYear() && new Date(data).getMonth() <= new Date(this.state.endDate).getMonth() && new Date(data).getDate() < new Date(this.state.endDate).getDate()) || new Date(data) < new Date(this.state.endDate)){
            this.setState({ startDate: data });
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
          <input 
            type="text"
            className="range-input"
            placeholder="End Date"
            name="endDate"
            value={ this.state.endDate }
            onChange={ this.handleChage }
          />
            {
              this.state.icon ?
                <i className="far fa-calendar"></i>
              : <i className="fas fa-times-circle"
                   onClick={this.handleClear}>
                </i>
            }
	      </div>
	        {
	          this.state.calender ?
		          <div style={{display: "flex"}}>
		            <Calender
                  hideCalender={this.hideCalender}
                  name="startDate"
                  today={this.setDate}
                />
		            <Calender
                  hideCalender={this.hideCalender}
                  name="endDate"
                  today={this.setDate}
                />
		          </div>
	          : null
	        }
	    </div>
    );
  }
}

export default DateRange;