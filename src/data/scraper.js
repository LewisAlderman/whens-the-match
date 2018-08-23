const rp = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const moment = require("moment");

let todayDate = moment().format("YYYYMMDD");
let tomorrowDate = moment()
	.add("1", "Day")
	.format("YYYYMMDD");
let twoDaysDate = moment()
	.add("2", "Day")
	.format("YYYYMMDD");

// --------------------------
//                TODAY
// --------------------------

const options = {
	uri:
		"http://www.wheresthematch.com/tv/home.asp?showdatestart=" +
		todayDate +
		"&sportid=1",
	transform: body => cheerio.load(body),
};

rp(options)
	.then($ => {
		// WRITE BELOW HERE

		// Fixtures Teams
		let fixtures = $(".fixture")
			.text()
			.trim()
			.split(/\s\s+/g);

		// Fixture Channels
		let names = [];
		$(".fixture-details .time-channel").each((i, el) => {
			names.push(el.children[3].data);
		});
		names = names.map(el => el.trim());

		let logos = [];
		$(".channel-details > a:first-of-type img").each((i, el) => {
			logos.push(
				"http://www.wheresthematch.com" +
					$(el)
						.attr("src")
						.slice(2)
			);
		});

		// Fixture Times
		let times = $(".start-details .time em strong")
			.text()
			.trim()
			.split(/m/g);
		times.pop();
		times = times.map(el => el + "m");

		// Setup containing object
		let matches = {};

		fixtures.forEach((fixture, i) => {
			matches[i] = {};
		});

		// Populate matches obj
		Object.values(matches).forEach((el, i) => {
			matches[i]["fixture"] = fixtures[i];
			matches[i]["time"] = times[i];
			matches[i]["channel"] = { name: names[i], logo: logos[i] };
		});

		// Fixture Competition
		let cups = [];
		$(".competition-name span")
			.not(".stage")
			.each((i, el) => {
				cups.push(el.children[0].data);
				return cups;
			});

		cups.forEach((el, i) => (matches[i]["competition"] = { cup: el }));

		let stages = [];
		$(".competition-name span.stage").each((i, el) => {
			if (el.children.length) {
				stages.push(el.children[0].data);
			} else {
				stages.push("");
			}
		});
		stages.forEach((el, i) => {
			matches[i]["competition"] = { ...matches[i]["competition"], stage: el };
		});

		// Detail Team#1 and Team#2
		fixtures.forEach((el, i) => {
			let bothTeams = el.split(" v ");
			let [teamOne, teamTwo] = bothTeams;
			matches[i]["homeTeam"] = { name: teamOne };
			matches[i]["awayTeam"] = { name: teamTwo };
		});

		// Include link to teams club crest
		$(".home-team .badge").each((i, el) => {
			let slug = el.attribs.src.slice(2); // slice removes '..'
			let uri = "http://www.wheresthematch.com" + slug;

			matches[i]["homeTeam"] = {
				...matches[i]["homeTeam"],
				badge: uri,
			};
		});
		$(".away-team .badge").each((i, el) => {
			let slug = el.attribs.src.slice(2); // slice removes '..'
			let uri = "http://www.wheresthematch.com" + slug;

			matches[i]["awayTeam"] = {
				...matches[i]["awayTeam"],
				badge: uri,
			};
		});

		// LEAVE ME TILL LAST
		// -----------------

		// If match not televised, remove it
		names.forEach((el, i) => {
			if (el === "Live Stream") {
				delete matches[i];
			}
		});

		// Correct indexed object keys
		let keys = Object.keys(matches).reduce(
			(acc, val, i) => [...acc, i + 1],
			[]
		);
		let values = Object.values(matches);

		let sortedMatches = values.reduce((obj, el, i) => {
			obj[i + 1] = el;

			return obj;
		}, {});

		// Convert to JSON
		let televisedFixtures = JSON.stringify(sortedMatches);

		// Create .json file from data
		fs.appendFile(
			"src/data/fixtures-today.json",
			televisedFixtures,
			err => (err ? console.log(err) : console.log("Success (Todays Fixtures)"))
		);
		// ----------
	})
	.catch(err => console.log("*ERROR (Todays Fixtures): " + err));

// --------------------------
//                TOMORROW
// --------------------------

const tomorrow = {
	uri:
		"http://www.wheresthematch.com/tv/home.asp?showdatestart=" +
		tomorrowDate +
		"&sportid=1",
	transform: body => cheerio.load(body),
};

rp(tomorrow)
	.then($ => {
		// WRITE BELOW HERE

		// Fixtures Teams
		let fixtures = $(".fixture")
			.text()
			.trim()
			.split(/\s\s+/g);

		// Fixture Channels
		let names = [];
		$(".fixture-details .time-channel").each((i, el) => {
			names.push(el.children[3].data);
		});
		names = names.map(el => el.trim());

		let logos = [];
		$(".channel-details > a:first-of-type img").each((i, el) => {
			logos.push(
				"http://www.wheresthematch.com" +
					$(el)
						.attr("src")
						.slice(2)
			);
		});

		// Fixture Times
		let times = $(".start-details .time em strong")
			.text()
			.trim()
			.split(/m/g);
		times.pop();
		times = times.map(el => el + "m");

		// Setup containing object
		let matches = {};

		fixtures.forEach((fixture, i) => {
			matches[i] = {};
		});

		// Populate matches obj
		Object.values(matches).forEach((el, i) => {
			matches[i]["fixture"] = fixtures[i];
			matches[i]["time"] = times[i];
			matches[i]["channel"] = { name: names[i], logo: logos[i] };
		});

		// Fixture Competition
		let cups = [];
		$(".competition-name span")
			.not(".stage")
			.each((i, el) => {
				cups.push(el.children[0].data);
				return cups;
			});

		cups.forEach((el, i) => (matches[i]["competition"] = { cup: el }));

		let stages = [];
		$(".competition-name span.stage").each((i, el) => {
			if (el.children.length) {
				stages.push(el.children[0].data);
			} else {
				stages.push("");
			}
		});
		stages.forEach((el, i) => {
			matches[i]["competition"] = { ...matches[i]["competition"], stage: el };
		});

		// Detail Team#1 and Team#2
		fixtures.forEach((el, i) => {
			let bothTeams = el.split(" v ");
			let [teamOne, teamTwo] = bothTeams;
			matches[i]["homeTeam"] = { name: teamOne };
			matches[i]["awayTeam"] = { name: teamTwo };
		});

		// Include link to teams club crest
		$(".home-team .badge").each((i, el) => {
			let slug = el.attribs.src.slice(2); // slice removes '..'
			let uri = "http://www.wheresthematch.com" + slug;

			matches[i]["homeTeam"] = {
				...matches[i]["homeTeam"],
				badge: uri,
			};
		});
		$(".away-team .badge").each((i, el) => {
			let slug = el.attribs.src.slice(2); // slice removes '..'
			let uri = "http://www.wheresthematch.com" + slug;

			matches[i]["awayTeam"] = {
				...matches[i]["awayTeam"],
				badge: uri,
			};
		});

		// LEAVE ME TILL LAST
		// ------------------

		// If match not televised, remove it
		names.forEach((el, i) => {
			if (el === "Live Stream") {
				delete matches[i];
			}
		});

		// Correct indexed object keys
		let keys = Object.keys(matches).reduce(
			(acc, val, i) => [...acc, i + 1],
			[]
		);
		let values = Object.values(matches);

		let sortedMatches = values.reduce((obj, el, i) => {
			obj[i + 1] = el;

			return obj;
		}, {});

		// Convert to JSON
		let televisedFixtures = JSON.stringify(sortedMatches);

		// Create .json file from data
		fs.appendFile(
			"src/data/fixtures-tomorrow.json",
			televisedFixtures,
			err =>
				err ? console.log(err) : console.log("Success (Tomorrows fixtures)")
		);
		// ----------
	})
	.catch(err => console.log("*ERROR (Tomorrows Fixtures): " + err));

// ------------------------
//            TWO_DAYS
// ------------------------

const two_days = {
	uri:
		"http://www.wheresthematch.com/tv/home.asp?showdatestart=" +
		twoDaysDate +
		"&sportid=1",
	transform: body => cheerio.load(body),
};

rp(two_days)
	.then($ => {
		// WRITE BELOW HERE

		// Fixtures Teams
		let fixtures = $(".fixture")
			.text()
			.trim()
			.split(/\s\s+/g);

		// Fixture Channels
		let names = [];
		$(".fixture-details .time-channel").each((i, el) => {
			names.push(el.children[3].data);
		});
		names = names.map(el => el.trim());

		let logos = [];
		$(".channel-details > a:first-of-type img").each((i, el) => {
			logos.push(
				"http://www.wheresthematch.com" +
					$(el)
						.attr("src")
						.slice(2)
			);
		});

		// Fixture Times
		let times = $(".start-details .time em strong")
			.text()
			.trim()
			.split(/m/g);
		times.pop();
		times = times.map(el => el + "m");

		// Setup containing object
		let matches = {};

		fixtures.forEach((fixture, i) => {
			matches[i] = {};
		});

		// Populate matches obj
		Object.values(matches).forEach((el, i) => {
			matches[i]["fixture"] = fixtures[i];
			matches[i]["time"] = times[i];
			matches[i]["channel"] = { name: names[i], logo: logos[i] };
		});

		// Fixture Competition
		let cups = [];
		$(".competition-name span")
			.not(".stage")
			.each((i, el) => {
				cups.push(el.children[0].data);
				return cups;
			});

		cups.forEach((el, i) => (matches[i]["competition"] = { cup: el }));

		let stages = [];
		$(".competition-name span.stage").each((i, el) => {
			if (el.children.length) {
				stages.push(el.children[0].data);
			} else {
				stages.push("");
			}
		});
		stages.forEach((el, i) => {
			matches[i]["competition"] = { ...matches[i]["competition"], stage: el };
		});

		// Detail Team#1 and Team#2
		fixtures.forEach((el, i) => {
			let bothTeams = el.split(" v ");
			let [teamOne, teamTwo] = bothTeams;
			matches[i]["homeTeam"] = { name: teamOne };
			matches[i]["awayTeam"] = { name: teamTwo };
		});

		// Include link to teams club crest
		$(".home-team .badge").each((i, el) => {
			let slug = el.attribs.src.slice(2); // slice removes '..'
			let uri = "http://www.wheresthematch.com" + slug;

			matches[i]["homeTeam"] = {
				...matches[i]["homeTeam"],
				badge: uri,
			};
		});
		$(".away-team .badge").each((i, el) => {
			let slug = el.attribs.src.slice(2); // slice removes '..'
			let uri = "http://www.wheresthematch.com" + slug;

			matches[i]["awayTeam"] = {
				...matches[i]["awayTeam"],
				badge: uri,
			};
		});

		// LEAVE ME TILL LAST
		// ------------------

		// If match not televised, remove it
		names.forEach((el, i) => {
			if (el === "Live Stream") {
				delete matches[i];
			}
		});

		// Correct indexed object keys
		let keys = Object.keys(matches).reduce(
			(acc, val, i) => [...acc, i + 1],
			[]
		);
		let values = Object.values(matches);

		let sortedMatches = values.reduce((obj, el, i) => {
			obj[i + 1] = el;

			return obj;
		}, {});

		// Convert to JSON
		let televisedFixtures = JSON.stringify(sortedMatches);

		// Create .json file from data
		fs.appendFile(
			"src/data/fixtures-two_days.json",
			televisedFixtures,
			err =>
				err ? console.log(err) : console.log("Success (Two_Day Fixtures)")
		);
		// ----------
	})
	.catch(err => console.log("*ERROR (Two_Day Fixtures): " + err));
