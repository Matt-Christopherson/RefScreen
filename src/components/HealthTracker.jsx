import React, { useState } from 'react';
import Draggable from 'react-draggable';

export default function HealthTracker({ onRemove }) {
	const [rows, setRows] = useState([{}, {}, {}]);

	const addRow = () => {
		setRows([...rows, {}]);
	};

	const [isHovered, setIsHovered] = useState(false);

	return (
		<Draggable>
			<div
				className="relative inline-block"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<table className="table-auto border-collapse border border-black">
					<tbody>
						{rows.map((_, index) => (
							<tr
								key={index}
								className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}
							>
								<td className="w-10">{index + 1}</td>
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
								<td className="w-12 border-l-2 border-gray-300">
									<input
										type='number'
										className="resize-none bg-transparent focus:outline-none text-xl text-right"
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
						))}
					</tbody>
				</table>
				<button
					className="bg-black hover:bg-gray-400 text-white font-bold py-2 px-4 rounded m-2"
					onClick={addRow}
				>
					+
				</button>
				{isHovered && (
					<button
						className="absolute top-0 left-0 m-1 p-1 w-2 h-2 bg-red-500 text-white rounded z-10"
						onClick={onRemove}
					>
						X
					</button>
				)}
			</div>
		</Draggable>
	);
}