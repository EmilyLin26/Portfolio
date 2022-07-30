import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Nav = () => {
	return (
		<nav
			style={{
				position: "sticky",
				top: 0,
				zIndex: "5",
				backgroundColor: "white",
				boxShadow: "0 7px 6px -6px grey",
			}}
		>
			<div className="headerIcon">
				<FaStar style={{ color: "#278A9F", fontSize: "2rem" }} />
				<h2 style={{ color: "#278A9F", fontSize: "2rem" }}>ColorfulWorld</h2>
			</div>

			<ul>
				<li>
					<Link to="/">Homepage</Link>
				</li>

				<li>
					<Link to="/videos">Videos</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
