import React, { Component } from 'react';

class Calender extends Component {

	constructor(props){
		super(props);
		// console.log(this.props.blur, "date prop...");
		this.dateFromInput = this.props.date;
		// console.log(`%c ${this.dateFromInput.split('/')[0]} app date...`, "color: red");
		this.date = new Date();
		this.state = {
			format: this.props.format,

			day: this.date.getDay(),

			date: this.props.date ? this.props.date.split('/')[2] : this.date.getDate(),

			month: this.props.date ? this.props.date.split('/')[1] : this.date.getMonth() + 1,

			year: this.props.date ? this.props.date.split('/')[0] : this.date.getFullYear(),

			weekDays: ["SUN","MON", "TUE", "WED","THU","FRI", "SAT"],

			months: ['January','February','March','April','May','June','July','August','September','October','November','December'],

			today: `${this.date.getFullYear()}/${ this.date.getMonth().toString().length < 2 ? "0" + this.date.getMonth().toString(): this.date.getMonth() }/${ this.date.getDate().toString().length < 2 ? "0" + this.date.getDate().toString() : this.date.getDate() }`,

			tableCells: 42,

			selectedDay: `${this.date.getFullYear()}/${ this.date.getMonth().toString().length < 2 ? "0" + this.date.getMonth().toString() : this.date.getMonth() }/${ this.date.getDate().toString().length < 2 ? "0" + this.date.getDate().toString() : this.date.getDate() }`,

			active: "active",

			showMonth: false,
			
			showYear: false,
			
			years: this.date.getFullYear(),

			calenderHdr: true
		}
	}

	// funtion to get feb days
	// if (this.state.month === 2) {
	//     if ((this.state.year % 100 !== 0) && (this.state.year % 4 === 0) || (this.state.year % 400 === 0)) {
	//       this.febDays = 29;
	//     } else {
	//       this.febDays = 28;
	//     }
	//   }else console.log("month is not == 2");

	
	handleClick = (e) => {

		// const currentDate = `${this.state.year}/${this.state.month.toString().length < 2 ? "0" + this.state.month.toString() : this.state.month }/${this.state.date.toString().length < 2 ? "0" + this.state.date.toString() : this.state.date }`;
		// console.log(`%c ${currentDate}`, 'color: red');
		

		if(e.target.dataset.key === "dec-year"){
			this.setState((state) => ({
					year: --state.year,
					selectedDay: `${state.year}/${state.month.toString().length < 2 ? "0" + state.month.toString() : state.month }/${state.date.toString().length < 2 ? "0" + state.date.toString() : state.date }`
				}),
				() =>	this.props.today(this.state.selectedDay, this.props.name)
			);
		} else if(e.target.dataset.key === "dec-month"){
				// console.log(this.state.month,"1");			
			if(this.state.month === 1){
				// console.log(this.state.month,"2");	

				this.setState((state) => ({
					year: --state.year,
					month: 12,
					selectedDay: `${state.year}/${state.month.toString().length < 2 ? "0" + state.month.toString() : state.month }/${state.date.toString().length < 2 ? "0" + state.date.toString() : state.date }` 
					}),
				 () => this.props.today(this.state.selectedDay, this.props.name));
			} else {
				this.setState((state) => ({
					month: --state.month,
					selectedDay: `${state.year}/${state.month.toString().length < 2 ? "0" + state.month.toString() : state.month }/${state.date.toString().length < 2 ? "0" + state.date.toString() : state.date }` 
				}),
				() => this.props.today(this.state.selectedDay, this.props.name));
			}
		} else if(e.target.dataset.key === "inc-year"){
			this.setState((state) => ({
				year: ++state.year,
				selectedDay: `${state.year}/${state.month.toString().length < 2 ? "0" + state.month.toString() : state.month }/${state.date.toString().length < 2 ? "0" + state.date.toString() : state.date }`
			}),
			() => this.props.today(this.state.selectedDay, this.props.name));
		} else if(e.target.dataset.key === "inc-month"){
				console.log(this.state.month,"1");		
				if(this.state.month === 12){
					console.log(this.state.month,"2");		
					this.setState((state) => ({
						month: 1,
						year: ++state.year,
						selectedDay: `${state.year}/${state.month.toString().length < 2 ? "0" + state.month.toString() : state.month }/${state.date.toString().length < 2 ? "0" + state.date.toString() : state.date }`
					}),
					() => {
						this.props.today(this.state.selectedDay, this.props.name);
					});
				} else {
					this.setState((state) => ({
						month: ++state.month,
						selectedDay: `${state.year}/${state.month.toString().length < 2 ? "0" + state.month.toString() : state.month }/${state.date.toString().length < 2 ? "0" + state.date.toString() : state.date }` 
					}),
					() => this.props.today(this.state.selectedDay, this.props.name)
				);
			}
		}else	return null;
	}

	getMonthDays = (year, month, num = 0) => {
		if(num === 0){
			const date1 = new Date(year, month, num);
    	return date1.getDate();
		} else if (num === 1){
			const date2 = new Date(year, month, num);
    	return date2.toDateString();
		} else { return null };
	}

	createTable = (num) => {
		const a = [];
		for(let i = 0; i < num; i++ ){
			a.push(i);
		}
		return a;
	}

	handleDay = (e) => {
		const { innerText } = e.target;
		const { month, year } = this.state;
		// console.log(`%c ${this.props.today} / ${ this.props.name }`, "color: green");
		// user selected date from calender
		const selectedDay = `${year}/${month.toString().length < 2 ? "0" + month : month }/${innerText.length < 2 ? "0" + innerText : innerText }`;

		this.setState(
			{ date: innerText, selectedDay: selectedDay },
			() => this.props.today(selectedDay, this.props.name)
			);
	}

	handleMonth = () => {
		this.setState({ showMonth: !this.state.showMonth, showYear: false });
	}

	handleYear = () => {
		this.setState({ showYear: !this.state.showYear, showMonth: false, calenderHdr: false });
	}

	selectMonth = (e) => {
		const { date, months, year, showMonth } = this.state;
		const selectedMonth = months.findIndex(v => v === e.target.innerText) + 1;
		// console.log(`%c selectedMonth ${selectedMonth}`, 'color: green');
		
		const selected = `${year}/${selectedMonth.toString().length < 2 ? "0" + selectedMonth.toString() : selectedMonth }/${date.length < 2 ? "0" + date : date }`;
		
		this.setState({
				month: selectedMonth,
				showMonth: !showMonth,
				selectedDay: selected,
		}, () => {
			this.props.today(selected, this.props.name);
		});
	}

	handleToday = () => {
		this.setState({ 
			day: this.date.getDay(),
			month: this.date.getMonth() + 1,
			year: this.date.getFullYear() 
		},
		() => this.props.today(this.state.today, this.props.name));
	}

	handleYears = (e, prevYear) => {
		
		// console.log(e.key,"key", prevYear,"prevYear", "handleYears called",)
		if(e.target.dataset.key === "incYearsRange"){
			this.setState({ years: prevYear + 10 });
		} else {
			this.setState({ years: prevYear - 10 });
		}
	}

	// year selection method
	selectYear = (seletedYear) => {
		let { date ,month } = this.state;
		this.setState({
			year: seletedYear,
			selectedDay: `${seletedYear}/${month.toString().length < 2 ? "0" + month.toString() : month }/${date.length < 2 ? "0" + date : date }`,
			showYear: false,
			calenderHdr: true
		},
		() =>	this.props.today(this.state.selectedDay, this.props.name));
	}


	// select = (e) => {
	// 	console.dir(e.target);
	// 	e.target.select();
	// }

	render() {
		// console.log(this.state.year);
		// console.log(this.febDays,"febDays", this.state, "rndr state...");
		let { month, year, months, weekDays, tableCells, showMonth, showYear, years, calenderHdr } = this.state;
		const isCurrnetMonth = new Date().getMonth() === +(this.state.month - 1);
		const isCurrnetYear = new Date().getFullYear() === +(this.state.year);

		// ===========
		// let years = this.date.getFullYear();
		// console.log(years, "rner cal");
		let yearsArr = [];
		var yaerLength = years - 12;

		while(years > yaerLength){
			yearsArr.push(years + 1)
			--years
		}

		// constole.log(yearsArr, "yearsArr....");
		// ============
		// var years = this.date.getFullYear() + 9 ;
		// to get the first day of month
		const firstDay = this.getMonthDays(year, (month - 1), 1).split(' ');

		// console.log(`%c first day ${firstDay}`, 'color:green;');
		// to get the all days of previous month
		const previousMonthDays = this.getMonthDays(year, (month - 1));
		
		// to get the all days of current month
		const currentMonthDays = this.getMonthDays(year, month);
		// console.log(`%c currentMonthDays ${currentMonthDays}`, 'color:yellow;');


		// to get the all days of next month
		// const nextMonthDays = this.getMonthDays(year, (month + 1));
		const position = weekDays.indexOf(firstDay[0].toUpperCase());
		// console.log(`%c position ${position}`, 'color:red;');

		let pastDays =  position;
		// console.log(`%c pastDays... ${ pastDays }`, 'color: blue;');

		const nextDays = tableCells - (position + currentMonthDays);
		const calender = [];
		// const popDay = pastDays + date - 1 ;

		// console.log(date, "date",pastDays,"pastDays", position, "position...", popDay, "popDay");

		// console.log(pastDays + currentMonthDays, "...////");

		// loop to add previous month days into an array
		while (pastDays > 0) { 
		  calender.push(previousMonthDays - (pastDays + 1));
		  --pastDays;
		}

		// loop to add current month days into an array
		for(let i = 1; i <= currentMonthDays; i++){
			calender.push(i);
		}

		// loop to add past month days into an array
		for(let j = 1; j <= nextDays; j++){
			calender.push(j);
		}

		return (
			<div className="calender">
				{
					<div>
						{
							calenderHdr ? 
								<div className="calender-hdr">
									<span onClick={this.handleClick} data-key="dec-year">{"<<"}</span>
									<span onClick={this.handleClick} data-key="dec-month">{"<"}</span>
									<h3>
										<span className="current-month" onClick={this.handleMonth}>{ months[month - 1] }</span>
										<span className="current-year" onClick={this.handleYear}> { year }</span>
									</h3>
									<span onClick={this.handleClick} data-key="inc-month">{">"}</span>
									<span onClick={this.handleClick} data-key="inc-year">{">>"}</span>
								</div>
								: null
						}

						<div className={ showMonth ? `disply-month mnth-tble` : "disply-month"}>
							{	
								!showMonth ? null :
									months.map((month, index) => (
										<p key={index} onClick={this.selectMonth}>{month}</p>
									))
							}
						</div>

						<div>
								{
									showYear ?
										<div>
											<div className="years-range">
												<span onClick={(e) => this.handleYears(e, yearsArr[1])} data-key="decYearsRange">{"<<"}</span>
													<p>{`${ yearsArr[yearsArr.length - 2] } - ${ yearsArr[1] }`}
													</p>
												<span onClick={(e) => this.handleYears(e, yearsArr[yearsArr.length - 2])} data-key="incYearsRange">{">>"}</span>
											</div>

											{	
												<div className="year-table">
													{
														yearsArr.reverse().map((year, idx) => (
														<p 
															className={ idx === 0 || idx === yearsArr.length - 1 ? "fade" : null }
															key={idx}
															onClick={
																idx === 0 ?
																	null
																	// (e) => this.handleYears(e, yearsArr[1])
																: idx === yearsArr.length - 1 ?
																	// (e) => this.handleYears(e, yearsArr[yearsArr.length - 2])
																	null
																: () => this.selectYear(year)
															}>
															{year}
														</p>
														))
													}
												</div>
											}
										</div>
									: null
								}
						</div>

						<div className="month">
							<div className="week-days">
								{
									weekDays.map((day,idx) => (
										<span key={idx}>{day}</span>
									))
								}
							</div>

							<div className="date-table">
								{
									calender.length ?
										calender.map((DATE, index) => (
											
											<p className={
												(index < position || index >= position + currentMonthDays) ?
													"fade":
													DATE === this.date.getDate() && isCurrnetMonth && isCurrnetYear && index === this.date.getDate() + position - 1 ?
												 	"day current-day" : "day"
												}
												onClick={
												 (index < position || index >= position + currentMonthDays) ? null : this.handleDay 
												}
												key={index}
												data-key={index+1}>
												{DATE}
											</p>
										)) 
									: null
								}
							</div>
							<div className="calender-footer">
								<p>
									<i className="fas fa-times-circle" onClick={this.props.hideCalender}></i>
								</p>
								<p className="today"
									onClick={this.handleToday}>today
								</p>

							</div>
						</div>

					</div>
				}
			</div>
		);
	}
}

export default Calender;
