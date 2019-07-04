import React, { Component } from 'react';

class Calender extends Component {

	constructor(props){
		super(props);
		this.date = new Date();

		this.state = {

			day: this.date.getDay(),

			date: this.date.getDate(),

			month: this.date.getMonth() + 1,

			year: this.date.getFullYear(),

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
	

	decYear = () => {
		this.setState((state) => ({
				year: --state.year,
				selectedDay: `${state.year}/${state.month.toString().length < 2 ? "0" + state.month.toString() : state.month }/${state.date.toString().length < 2 ? "0" + state.date.toString() : state.date }`
			}),
			() =>	this.props.today(this.state.selectedDay, this.props.name)
		);
	} 

	decMonth = () => {
		if(this.state.month === 1){
			this.setState((state) => ({
				year: --state.year,
				month: 12,
				selectedDay: `${state.year}/12/${state.date.toString().length < 2 ? "0" + state.date.toString() : state.date }` 
				}),
			 () => this.props.today(this.state.selectedDay, this.props.name));
		} else {
			this.setState((state) => ({
				month: --state.month,
				selectedDay: `${state.year}/${state.month.toString().length < 2 ? "0" + state.month.toString() : state.month }/${state.date.toString().length < 2 ? "0" + state.date.toString() : state.date }` 
			}),
			() => this.props.today(this.state.selectedDay, this.props.name));
		}
	} 

	incYear = () => {
		this.setState((state) => ({
			year: ++state.year,
			selectedDay: `${state.year}/${state.month.toString().length < 2 ? "0" + state.month.toString() : state.month }/${state.date.toString().length < 2 ? "0" + state.date.toString() : state.date }`
		}),
		() => this.props.today(this.state.selectedDay, this.props.name));
	} 

	incMonth = () => {
			if(this.state.month === 12){
				this.setState((state) => ({
					month: 1,
					year: ++state.year,
					selectedDay: `${state.year}/01/${state.date.toString().length < 2 ? "0" + state.date.toString() : state.date }`
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
		const selectedDay = `${year}/${month.toString().length < 2 ? "0" + month : month }/${innerText.length < 2 ? "0" + innerText : innerText }`;

		this.setState({
			date: innerText,
			selectedDay: selectedDay,
			showYear: false,
			showMonth: false,
			calenderHdr: true
		},
			() => this.props.today(selectedDay, this.props.name)
		);
	}

	handleMonth = () => {
		this.setState({
			showMonth: !this.state.showMonth,
			showYear: false
		});
	}

	handleYear = () => {
		this.setState({
			showYear: !this.state.showYear,
			showMonth: false,
			calenderHdr: false
		});
	}

	selectMonth = (e) => {
		const { date, months, year, showMonth } = this.state;
		const selectedMonth = months.findIndex(v => v === e.target.innerText) + 1;
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
			year: this.date.getFullYear(),
			years: this.date.getFullYear(),
			showYear: false,
			showMonth: false,
			calenderHdr: true
		},
		() => this.props.today(this.state.today, this.props.name));
	}

	decYearsRange = (year) => {
		this.setState({ years: year - 10 });
	}

	incYearsRange = (year) => {
		this.setState({ years: year + 10 });
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

	render() {
		let { month, year, months, weekDays, tableCells, showMonth, showYear, years, calenderHdr } = this.state;
		const isCurrnetMonth = new Date().getMonth() === +(this.state.month - 1);
		const isCurrnetYear = new Date().getFullYear() === +(this.state.year);
		const firstDay = this.getMonthDays(year, (month - 1), 1).split(' ');

		// to get the all days of previous month
		const previousMonthDays = this.getMonthDays(year, (month - 1));
		
		// to get the all days of current month
		const currentMonthDays = this.getMonthDays(year, month);

		// to get the all days of next month
		const position = weekDays.indexOf(firstDay[0].toUpperCase());
		let pastDays =  position;
		const nextDays = tableCells - (position + currentMonthDays);
		const calender = [];

		// years table generator loop
		let yearsArr = [];
		var yaerLength = years - 12;

		while(years > yaerLength){
			yearsArr.push(years + 1)
			--years
		}
		
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
									<span onClick={this.decYear}>{"<<"}</span>

									<span onClick={this.decMonth}>{"<"}</span>

									<div className="year_month">
										<span
											className="current-month"
											onClick={this.handleMonth}>
											{ months[month - 1] }
										</span>

										<span
											className="current-year"
											onClick={this.handleYear}>
											{ year }
										</span>
									</div>
									<span onClick={this.incMonth}>{">"}</span>
									<span onClick={this.incYear}>{">>"}</span>
								</div>
								: null
						}

						<div 
							className={ showMonth ? `disply-month mnth-tble` : "disply-month"}>
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
												<span
													onClick={
														() => this.decYearsRange(yearsArr[yearsArr.length - 2])}>
													{"<<"}
												</span>

												<p>{`${ yearsArr[yearsArr.length - 2] } - ${ yearsArr[1] }`}
												</p>
												<span
													onClick={
														() => this.incYearsRange(yearsArr[yearsArr.length - 2])}>
													{">>"}
												</span>
											</div>

											{	
												<div className="year-table">
													{
														yearsArr.reverse().map((year, idx) => (
														<p 
															className={ idx === 0 || idx === yearsArr.length - 1 ? "fade" : null }
															key={idx}
															onClick={
																idx === 0 || idx === yearsArr.length - 1 ? null
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
									<i className="fas fa-times-circle"
										onClick={this.props.hideCalender}>
									</i>
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
