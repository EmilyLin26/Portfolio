import React, { useState, useEffect } from "react";
import SearchPhotos from "../components/SearchPhotos";
import Picture from "../components/Picture";

const Homepage = () => {
	let [input, setInput] = useState("");
	let [page, setPage] = useState(1);
	let [currentSearch, setCurrentSearch] = useState("");
	//從searchPhotos移過來
	let [data, setData] = useState([]);

	const auth = "563492ad6f917000010000015b07d8dffa7d4a1c8b46dd1eca9adca6";
	const photoURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
	const searchPhotoURL = `https://api.pexels.com/v1/search?query=${input}&page=1&per_page=15`;

	//fetch data from pexels api
	const searchPhotos = async (url) => {
		setPage(2);
		let dataFetch = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: auth,
			},
		});
		let parsedData = await dataFetch.json();
		setData(parsedData.photos);
		console.log(parsedData.photos);

		//搜尋關鍵字失敗設定
		if (parsedData.photos.length === 0) {
			let body = document.querySelector("body");
			let myh3 = document.createElement("h3");
			myh3.style = "text-align:center; font-size:2rem";
			myh3.innerHTML = `Can't find anything related to "${input}". Please search other keywords instead.`;
			body.appendChild(myh3);
		} else {
			let myh3 = document.querySelector("h3");
			myh3.remove();
		}
	};

	//load more
	const morePhotos = async () => {
		let newURL;
		if (currentSearch === "") {
			newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
		} else {
			newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${page}&per_page=15`;
		}
		setPage(page + 1);

		let dataFetch = await fetch(newURL, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: auth,
			},
		});
		let parsedData = await dataFetch.json();
		setData(data.concat(parsedData.photos));
	};

	//fetch data when page loads up
	useEffect(() => {
		searchPhotos(photoURL);
	}, []);

	return (
		<div style={{ minHeight: "110vh" }}>
			<div className="homepageImage"></div>

			<SearchPhotos
				searchPhotos={() => {
					searchPhotos(searchPhotoURL);
					setCurrentSearch(input);
				}}
				setInput={setInput}
				input={input}
			/>
			<p
				style={{
					fontSize: "3rem",
					color: "#278A9F",
					textAlign: "center",
					padding: "2rem",
				}}
			>
				Popular Photos:
			</p>
			<div className="pictures">
				{data.map((d) => {
					return <Picture data={d} key={d.id} />;
				})}
			</div>
			<div className="morePhotos">
				<button onClick={morePhotos}>Load more</button>
			</div>
		</div>
	);
};

export default Homepage;
