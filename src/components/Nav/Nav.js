import React from "react";
import "./style.css";

const Nav = ({ handleTodayClick, handleTommorowClick, handleTwoDaysClick }) => {
	return (
		<header>
			<nav className="hidden">
				<h1 onClick={handleTodayClick}>Today</h1>
				<h1 onClick={handleTommorowClick}>Tomorrow</h1>
				<h1 onClick={handleTwoDaysClick}>Two Days</h1>
			</nav>
			<h1 id="toggle" onClick={e => toggleClick(e)}>
				{document.querySelector("nav") ? (
					<svg
						id="ei-navicon-icon"
						viewBox="0 0 50 50"
						width="100%"
						height="100%"
					>
						<path d="M10 12h30v4H10z" />
						<path d="M10 22h30v4H10z" />
						<path d="M10 32h30v4H10z" />
					</svg>
				) : (
					<svg
						id="ei-close-icon"
						viewBox="0 0 50 50"
						width="100%"
						height="100%"
					>
						<path d="M37.304 11.282l1.414 1.414-26.022 26.02-1.414-1.413z" />
						<path d="M12.696 11.282l26.022 26.02-1.414 1.415-26.022-26.02z" />
					</svg>
				)}
			</h1>
		</header>
	);
};

const toggleClick = e => {
	document.querySelector("nav").className
		? document.querySelector("nav").classList.remove("hidden")
		: (document.querySelector("nav").className = "hidden");
};

export default Nav;
