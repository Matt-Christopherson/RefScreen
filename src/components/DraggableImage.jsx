import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

export default function DraggableImage({ src, onRemove }) {
	const [dimensions, setDimensions] = useState({ width: 200, height: 200 });
	const [isResizing, setIsResizing] = useState(false);
	const [startMousePos, setStartMousePos] = useState({ x: 0, y: 0 });

	const MAX_HEIGHT = 400;

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

	const handleImageLoad = (e) => {
		const { naturalWidth, naturalHeight } = e.target;
		const adjustedHeight = naturalHeight > MAX_HEIGHT ? MAX_HEIGHT : naturalHeight;
		const aspectRatio = naturalWidth / naturalHeight;
		setDimensions({
			width: adjustedHeight * aspectRatio,
			height: adjustedHeight,
		});
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
			>
				<img
					src={src}
					draggable="false"
					alt="Uploaded Image"
					style={{ width: '100%', height: '100%', objectFit: 'contain' }} // Ensure the image covers the entire div
					onLoad={handleImageLoad} // Set dimensions on image load
				/>
				<div
					className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize resizer"
					onMouseDown={handleMouseDown}
				></div>
				<button
					className="absolute top-0 left-0 m-1 p-1 w-2 h-2 bg-red-500 text-white rounded z-10"
					onClick={onRemove}
				>
					X
				</button>
			</div>
		</Draggable>
	);
}
