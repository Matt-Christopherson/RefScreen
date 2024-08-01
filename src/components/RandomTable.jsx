import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

export default function RandomTable({ diceAmount, dieValue, onRemove, tableLabel, onLabelChange }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLabel, setCurrentLabel] = useState(tableLabel);
  const numberOfRows = diceAmount * dieValue - (diceAmount - 1);
  const rows = [];
  const textareasRef = useRef([]);

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (index < textareasRef.current.length - 1) {
        textareasRef.current[index + 1].focus();
      }
    }
  };

  const handleCaptionClick = () => {
    setIsEditing(true);
  };

  const handleCaptionBlur = () => {
    setIsEditing(false);
    onLabelChange(currentLabel); // Notify parent component of the change
  };

  const handleCaptionChange = (event) => {
    setCurrentLabel(event.target.value);
  };

  for (let i = 0; i < numberOfRows; i++) {
    // Alternate row backgrounds
    const rowClass = i % 2 === 0 ? 'bg-white' : 'bg-gray-200';

    rows.push(
      <tr key={i} className={rowClass}>
        <td className="w-10">{i + diceAmount}</td>
        <td className="flex items-center justify-center">
          <textarea
            ref={(el) => textareasRef.current[i] = el}
            className="resize-none border border-gray-300 bg-white focus:outline-none text-xl"
            style={{
              height: '3rem',
              width: '100%',
              padding: '0.5rem',
              boxSizing: 'border-box',
            }}
            onKeyDown={(event) => handleKeyDown(event, i)}
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
          <caption
            onClick={handleCaptionClick}
            className="text-center text-lg font-semibold mb-2 cursor-pointer"
          >
            {isEditing ? (
              <input
                type="text"
                value={currentLabel}
                onChange={handleCaptionChange}
                onBlur={handleCaptionBlur}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCaptionBlur();
                }}
                autoFocus
                className="w-full border-none bg-transparent text-lg"
              />
            ) : (
              currentLabel
            )}
          </caption>
          <tbody>{rows}</tbody>
        </table>
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
