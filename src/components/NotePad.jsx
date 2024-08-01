import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

export default function NotePad({ onRemove }) {
	const [dimensions, setDimensions] = useState({ width: 200, height: 200 });
	const [isResizing, setIsResizing] = useState(false);
	const [startMousePos, setStartMousePos] = useState({ x: 0, y: 0 });
	const [fontSize, setFontSize] = useState(16); // Initial font size
	const [isHovered, setIsHovered] = useState(false); // State to track hover

	const handleMouseDown = (e) => {
		e.stopPropagation(); // Prevent drag event when resizing
		setIsResizing(true);
		setStartMousePos({ x: e.clientX, y: e.clientY });
	};

	const handleMouseMove = (e) => {
		if (isResizing) {
			const dx = e.clientX - startMousePos.x;
			const dy = e.clientY - startMousePos.y;

			// Increase width and height simultaneously based on the distance dragged
			const newWidth = Math.max(50, dimensions.width + dx);
			const newHeight = Math.max(50, dimensions.height + dy);

			setDimensions({ width: newWidth, height: newHeight });
			// Update the start position for the next movement
			setStartMousePos({ x: e.clientX, y: e.clientY });
		}
	};

	const handleMouseUp = () => {
		setIsResizing(false);
	};

	const increaseFontSize = () => {
		setFontSize((prevSize) => prevSize + 2); // Increase font size by 2px
	};

	const decreaseFontSize = () => {
		setFontSize((prevSize) => Math.max(8, prevSize - 2)); // Decrease font size by 2px, minimum 8px
	};

	useEffect(() => {
		if (isResizing) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);
		} else {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isResizing]);

	return (
		<Draggable>
			<div
				className="relative inline-block"
				style={{ width: dimensions.width, height: dimensions.height }}
				onMouseEnter={() => setIsHovered(true)} // Show buttons on hover
				onMouseLeave={() => setIsHovered(false)} // Hide buttons when not hovering
			>
                <caption><input></input></caption>
				<textarea
					className="w-full h-full p-2 border border-gray-300 resize-none"
					style={{ fontSize: `${fontSize}px` }} // Set the font size
					placeholder="Type your notes here..."
				></textarea>
				<div
					className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize resizer"
					onMouseDown={handleMouseDown}
				></div>
				<button
					className={`absolute top-0 left-0 m-1 p-1 w-2 h-2 bg-red-500 text-white rounded z-10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
					onClick={onRemove}
				>
				</button>
				<div className={`absolute bottom-0 left-0 flex flex-col items-center space-y-1 p-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
					<button
						className="bg-gray-300 p-1 rounded"
						onClick={increaseFontSize}
					>
						▲
					</button>
					<button
						className="bg-gray-300 p-1 rounded"
						onClick={decreaseFontSize}
					>
						▼
					</button>
				</div>
			</div>
		</Draggable>
	);
}
