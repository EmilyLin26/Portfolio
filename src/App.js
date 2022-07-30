import React from "react";
import "./styles/style.css";
import Homepage from "./pages/Homepage";
import Videos from "./pages/Videos";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Nav />
			<Routes>
				<Route path="/" element={<Homepage />} exact />
				<Route path="/videos" element={<Videos />} exact />
			</Routes>
		</div>
	);
}

export default App;
