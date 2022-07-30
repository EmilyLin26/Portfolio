import React from "react";
import { GoSearch } from "react-icons/go";

const SearchVideos = ({ searchVideos, setVinput }) => {
	const vinputHandler = (e) => {
		setVinput(e.target.value);
	};
	return (
		<div className="container">
			<div className="search">
				<input
					onChange={vinputHandler}
					type="text"
					placeholder="Search videos here"
				/>
				<button onClick={searchVideos}>
					<GoSearch style={{ fontSize: "1.5rem" }} />
				</button>
			</div>
		</div>
	);
};

export default SearchVideos;
