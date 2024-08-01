import React, { useState } from 'react';
import './App.css';
import HealthTracker from './components/HealthTracker';
import RandomTable from './components/RandomTable';
import DraggableImage from './components/DraggableImage';
import NotePad from './components/NotePad'; // Import NotePad component

function App() {
	const [components, setComponents] = useState([]);

	const addHealthTracker = () => {
		setComponents([...components, { type: 'healthTracker' }]);
	};

	const addRandomTable = () => {
		const diceAmount = prompt('Enter the number of dice:');
		const dieValue = prompt('Enter the value of the die:');
		if (diceAmount && dieValue) {
			setComponents([...components, { type: 'randomTable', diceAmount: Number(diceAmount), dieValue: Number(dieValue) }]);
		}
	};

	const addDraggableImage = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.onchange = (event) => {
			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setComponents([
						...components,
						{ type: 'draggableImage', src: reader.result },
					]);
				};
				reader.readAsDataURL(file);
			}
		};
		input.click();
	};

	const addNotePad = () => {
			setComponents([...components, { type: 'notePad' }]);
	};

	const removeComponent = (index) => {
		setComponents(components.filter((_, i) => i !== index));
	};

	return (
		<div className="App flex flex-col min-h-screen">
			<main className="flex-grow p-4">
				{components.map((component, index) => {
					if (component.type === 'healthTracker') {
						return (
							<HealthTracker
								key={index}
								onRemove={() => removeComponent(index)}
							/>
						);
					} else if (component.type === 'randomTable') {
						return (
							<RandomTable
								key={index}
								diceAmount={component.diceAmount}
								dieValue={component.dieValue}
								onRemove={() => removeComponent(index)}
							/>
						);
					} else if (component.type === 'draggableImage') {
						return (
							<DraggableImage
								key={index}
								src={component.src}
								onRemove={() => removeComponent(index)}
							/>
						);
					} else if (component.type === 'notePad') {
						return (
							<NotePad
								key={index}
								onRemove={() => removeComponent(index)}
							/>
						);
					}
					return null;
				})}
			</main>
			<footer className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 text-center">
				<button
					onClick={addHealthTracker}
					className="bg-white hover:bg-gray-400 text-black font-bold py-2 px-4 rounded m-2"
				>
					Add Health Tracker
				</button>
				<button
					onClick={addRandomTable}
					className="bg-white hover:bg-gray-400 text-black font-bold py-2 px-4 rounded m-2"
				>
					Add Random Table
				</button>
				<button
					onClick={addDraggableImage}
					className="bg-white hover:bg-gray-400 text-black font-bold py-2 px-4 rounded m-2"
				>
					Add Image
				</button>
				<button
					onClick={addNotePad}
					className="bg-white hover:bg-gray-400 text-black font-bold py-2 px-4 rounded m-2"
				>
					Add NotePad
				</button>
			</footer>
		</div>
	);
}

export default App;
