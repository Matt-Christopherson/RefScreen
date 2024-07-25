import React, { useState } from 'react';
import Draggable from 'react-draggable';

export default function RandomTable({
	diceAmount,
	dieValue,
	onRemove,
	tableLabel,
}) {
	const [isHovered, setIsHovered] = useState(false);
	const numberOfRows = diceAmount * dieValue - (diceAmount - 1);
	const rows = [];

	for (let i = 0; i < numberOfRows; i++) {
		// Alternate row backgrounds
		const rowClass = i % 2 === 0 ? 'bg-white' : 'bg-gray-200';

		rows.push(
			<tr key={i} className={rowClass}>
				<td className="w-10">{i + diceAmount}</td>
				<td className="flex items-center justify-center">
					<textarea
						className="resize-none border-none bg-transparent focus:outline-none text-xl"
						style={{
							height: '3rem',
							width: '100%',
							padding: '0',
							lineHeight: '3rem',
							boxSizing: 'border-box',
						}}
					/>
				</td>
			</tr>
		);
	}

	return (
		<Draggable>
			<div
				className="relative inline-block"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<table className="table-auto border-collapse border border-black">
					<caption className="text-center text-lg font-semibold mb-2">
						{tableLabel}
					</caption>
					<tbody>{rows}</tbody>
				</table>
				{isHovered && (
					<button
						className="absolute top-0 left-0 m-1 p-1 w-2 h-2 bg-red-500 text-white rounded z-10"
						onClick={onRemove}
					></button>
				)}
			</div>
		</Draggable>
	);
}
