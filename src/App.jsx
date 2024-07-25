import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './App.css';

function App() {
	const [dragTime, enableDragTime] = useState(false);
	function handleDragClick() {
		enableDragTime(true);
	}

	return (
		<div className="App">
			<Draggable>
				<div className="resizable resize overflow-auto rounded-md border-2 border-solid border-black w-24 h-24 bg-slate-600"></div>
			</Draggable>
			<button></button>
		</div>
	);
}

export default App;
