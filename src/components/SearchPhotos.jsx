import React from "react";
import { GoSearch } from "react-icons/go";

const Search = ({ searchPhotos, setInput, input }) => {
	const inputHandler = (e) => {
		setInput(e.target.value);
	};

	return (
		<div className="container">
			<div className="search">
				<input
					onChange={inputHandler}
					value={input}
					type="text"
					placeholder="Search photos here"
				/>
				<button onClick={searchPhotos}>
					<GoSearch style={{ fontSize: "1.5rem" }} />
				</button>
			</div>
		</div>
	);
};

export default Search;
