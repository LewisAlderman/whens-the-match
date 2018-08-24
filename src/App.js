import React, { Component } from "react";
import "./App.css";
import fixturesToday from "./data/fixtures-today.json";
import fixturesTomorrow from "./data/fixtures-tomorrow.json";
import fixturesTwoDays from "./data/fixtures-two_days.json";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.showToday = this.showToday.bind(this);
		this.showTomorrow = this.showTomorrow.bind(this);
		this.showTwoDays = this.showTwoDays.bind(this);
		this.setActive = this.setActive.bind(this);
	}

	componentDidMount() {
		document.querySelector("nav > *:first-child").classList.add("active");
		this.setState({ ...fixturesToday });
	}

	showToday = e => {
		this.setState({ ...fixturesToday });
		this.setActive(e.target);
	};
	showTomorrow = e => {
		this.setState({ ...fixturesTomorrow });
		this.setActive(e.target);
	};
	showTwoDays = e => {
		this.setState({ ...fixturesTwoDays });
		this.setActive(e.target);
	};

	setActive = el => {
		if (document.querySelector(".active")) {
			document.querySelector(".active").classList.remove("active");
		}
		el.classList.add("active");
		document.querySelector("nav").className = "hidden";
	};

	render() {
		return (
			<React.Fragment>
				<Nav
					handleTodayClick={e => this.showToday(e)}
					handleTommorowClick={e => this.showTomorrow(e)}
					handleTwoDaysClick={e => this.showTwoDays(e)}
				/>
				<div className="App">
					{Object.values(this.state).map((el, i) => {
						return (
							<div className="row" key={i}>
								<div className="home badge">
									<img src={el.homeTeam.badge} alt="home badge" />
								</div>
								<div className="details">
									<h2 className="time">{el.time}</h2>
									<h1 className="home-team name">{el.homeTeam.name}</h1>
									<h1 className="away-team name">{el.awayTeam.name}</h1>
									<h3 className="competition">{el.competition.cup}</h3>
									<h4 className="stage">{el.competition.stage}</h4>
									<div className="channel">
										<img
											src={el.channel.logo}
											alt="channel logo"
											className="channel-logo"
										/>
									</div>
								</div>
								<div className="away badge">
									<img src={el.awayTeam.badge} alt="away badge" />
								</div>
							</div>
						);
					})}
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default App;
