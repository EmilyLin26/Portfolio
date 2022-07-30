import React, { useState, useEffect } from "react";
import SearchVideos from "../components/SearchVideos";
import Clip from "../components/Clip";

const Videos = () => {
	let [vinput, setVinput] = useState("");
	let [vpage, setVpage] = useState(1);
	let [currentSearch, setCurrentSearch] = useState("");
	//從searchVideos移過來
	let [vdata, setVdata] = useState([]);
	const auth = "563492ad6f917000010000015b07d8dffa7d4a1c8b46dd1eca9adca6";
	const videoURL = "https://api.pexels.com/videos/popular?page=1&per_page=16";
	const searchVideoURL = `https://api.pexels.com/videos/search?query=${vinput}&page=1&per_page=16`;

	//fetch data from pexels api
	const searchVideos = async (url) => {
		setVpage(2);
		let dataFetch = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: auth,
			},
		});
		let parsedData = await dataFetch.json();
		setVdata(parsedData.videos);
		console.log(parsedData.videos);

		//搜尋關鍵字失敗設定
		if (parsedData.videos.length === 0) {
			let body = document.querySelector("body");
			let myh3 = document.createElement("h3");
			myh3.style = "text-align:center; font-size:2rem";
			myh3.innerHTML = `Can't find anything related to "${vinput}". Please search other keywords instead.`;
			body.appendChild(myh3);
		} else {
			let myh3 = document.querySelector("h3");
			myh3.remove();
		}
	};

	//load more
	const moreVideos = async () => {
		let newURL;
		if (currentSearch === "") {
			newURL = `https://api.pexels.com/videos/popular?page=${vpage}&per_page=16`;
		} else {
			newURL = `https://api.pexels.com/videos/search?query=${currentSearch}&page=${vpage}&per_page=16`;
		}
		setVpage(vpage + 1);

		let dataFetch = await fetch(newURL, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: auth,
			},
		});
		let parsedData = await dataFetch.json();
		setVdata(vdata.concat(parsedData.videos));
	};

	//fetch data when page loads up
	useEffect(() => {
		searchVideos(videoURL);
	}, []);

	return (
		<div style={{ minHeight: "110vh" }}>
			<div className="videoImage"></div>

			<SearchVideos
				searchVideos={() => {
					searchVideos(searchVideoURL);
					setCurrentSearch(vinput);
				}}
				setVinput={setVinput}
			/>

			<p
				style={{
					fontSize: "3rem",
					color: "#278A9F",
					textAlign: "center",
					padding: "2rem",
				}}
			>
				Popular Videos:
			</p>

			<div
				className="clips"
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{vdata.map((vd) => {
					return <Clip vdata={vd} key={vd.id} />;
				})}
			</div>
			<div className="moreVideos">
				<button onClick={moreVideos}>Load more</button>
			</div>
		</div>
	);
};

export default Videos;
