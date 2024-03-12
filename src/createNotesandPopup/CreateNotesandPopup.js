
import React, { useState, useEffect } from "react";
import "./CreateNotesandPopup.css";

const colors = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];


const getInitials = (name) => {
  const words = name.split(" ");
  const initials = words.reduce((acc, word) => acc + word[0], "");
  return initials.toUpperCase();
};



function CreateNotesAndPopup() {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    try {
      const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      console.log("Stored Notes:", storedNotes);
      setNotes(storedNotes);
    } catch (error) {
      console.error("Error parsing JSON from local storage:", error);
      // Handle the error, e.g., set notes to an empty array
      setNotes([]);
    }
  }, []);

  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleCreate = () => {
    // Check if the group name is not empty
    if (!groupName.trim()) {
      alert("Group name cannot be empty");
      return;
    }

    // Save data to localStorage
    const newNote = {
      groupName,
      selectedColor,
    };

    const updatedNotes = [...notes, newNote];
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    // Reset form and close it
    setGroupName("");
    setSelectedColor(colors[0]);
    setFormOpen(false);
    setNotes(updatedNotes);
  };

  return (
    <div className="notes-container">
      <div>
        <p className="first-line">Pocket Notes</p>
      </div>

      {isFormOpen && (
        <div className="form-data">
          <div>
            <p>Create New group</p>
            Group Name:{" "}
            <input
              placeholder="Enter Group Name..."
              type="text"
              value={groupName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <ul className="color-list">
              Choose the colors:
              {colors.map((color, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: color,
                    border: color === selectedColor ? "2px solid #000" : "none",
                  }}
                  onClick={() => handleColorChange(color)}
                ></li>
              ))}
            </ul>
          </div>
          <div>
            <button onClick={handleCreate}>Create</button>
          </div>
        </div>
      )}

      {/* Displaying saved notes */}
      <div className="saved-notes">
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              <div className="circle-bg">
                <div
                  className="circle"
                  style={{ backgroundColor: note.selectedColor }}
                >
                  {getInitials(note.groupName)}
                </div>
              </div>
              <span> {note.groupName}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="create-notes-button">
        <button
          className="btn"
          onClick={() => setFormOpen(!isFormOpen)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default CreateNotesAndPopup;
