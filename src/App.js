import React, { useState } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';

function App() {
	const [ state, setState ] = useState({
		s: '',
		results: [],
		selected: {}
	});

	const api_url = 'http://www.omdbapi.com/?apikey=9fa8ffbe';

	const search = (e) => {
		if (e.key === 'Enter') {
			axios(api_url + '&s=' + state.s).then(({ data }) => {
				let results = data.Search;

				setState((prevState) => {
					return { ...prevState, results: results };
				});
			});
		}
	};

	const handleInput = (e) => {
		let s = e.target.value;

		setState((prevState) => {
			return { ...prevState, s: s };
		});
	};

	const openPopup = (id) => {
		axios(api_url + '&i=' + id).then(({ data }) => {
			let result = data;

			setState((prevState) => {
				return { ...prevState, selected: result };
			});
		});
	};

	const closePopup = () => {
		setState((prevState) => {
			return { ...prevState, selected: {} };
		});
	};

	return (
		<div className="App">
			<header>
				<h1>!MDB</h1>
			</header>
			<main>
				<Search handleInput={handleInput} search={search} />
				<Results results={state.results} openPopup={openPopup} />

				{typeof state.selected.Title != 'undefined' ? (
					<Popup selected={state.selected} closePopup={closePopup} />
				) : (
					false
				)}
			</main>
		</div>
	);
}

export default App;
