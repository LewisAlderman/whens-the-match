import React, { Component } from "react";
import "./App.css";
// import { fixtures } from "./data/state";
import fixtures from "./data/fixtures.json";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.setState({ ...fixtures });
	}

	render() {
		return (
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
		);
	}
}

export default App;
