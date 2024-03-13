// PopupWindow.js

import React from 'react';

function PopupWindow({ selectedGroup, handleClosePopup, messages, message, handleMessageChange, handleSend, getInitials }) {
  // Check if selectedGroup is null before accessing its properties
  if (!selectedGroup) {
    return null; // Return null or any other fallback content if selectedGroup is null
  }

  return (
    <div className="group-details">
      <button className="close-popup" onClick={handleClosePopup}>X</button>
      <div className="circle-bg">
        <div
          className="circle"
          style={{ backgroundColor: selectedGroup.selectedColor, margin: "10px" }}
        >
          {getInitials(selectedGroup.groupName)}
        </div>
      </div>
      <h2>{selectedGroup.groupName}</h2>
      {/* Display tasks */}
      <ul>
        {messages.map((task, index) => (
          <li key={index}>
            <p>{task.text}</p>
            <p>{task.time}</p>
          </li>
        ))}
      </ul>
      {/* Textarea for new task */}
      <textarea
        rows="4"
        cols="50"
        value={message}
        onChange={handleMessageChange}
        placeholder="Enter your task..."
      ></textarea>
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default PopupWindow;
