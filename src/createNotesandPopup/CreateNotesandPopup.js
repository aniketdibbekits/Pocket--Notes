// CreateNotesAndPopup.js
import React, { useState, useEffect } from 'react';
import './CreateNotesandPopup.css';

const colors = [
  '#B38BFA',
  '#FF79F2',
  '#43E6FC',
  '#F19576',
  '#0047FF',
  '#6691FF',
];

const getInitials = (name) => {
  const words = name.split(' ');
  const initials = words.reduce((acc, word) => acc + word[0], '');
  return initials.toUpperCase();
};

function CreateNotesAndPopup({ onGroupSelect }) {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    try {
      const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
      setNotes(storedNotes);
    } catch (error) {
      console.error('Error parsing JSON from local storage:', error);
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
    if (!groupName.trim()) {
      alert('Group name cannot be empty');
      return;
    }

    const newNote = {
      groupName,
      selectedColor,
    };

    const updatedNotes = [...notes, newNote];
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    setGroupName('');
    setSelectedColor(colors[0]);
    setFormOpen(false);
    setNotes(updatedNotes);
  };

  const handleGroupClick = (index) => {
    const selectedGroup = notes[index];
    onGroupSelect(selectedGroup);
  };

  return (
    <div className="notes-container">
      <div>
        <p className="first-line">Pocket Notes</p>
      </div>

      {isFormOpen && <div className="blur-backdrop"></div>}

      {isFormOpen && (
        <div className="form-overlay">
          <div className="form-data">
            <div className="form-div">
              <p style={{ fontSize: '20px', fontWeight: '500' }}>Create New Group</p>
              <label htmlFor="group-name">Group Name:</label>{' '}
              <input
                id="group-name"
                className="input-name"
                placeholder="Enter Group Name..."
                type="text"
                value={groupName}
                onChange={handleInputChange}
              />
              <div>
                <ul className="color-list">
                  Choose the colors:
                  {colors.map((color, index) => (
                    <li
                      key={index}
                      style={{
                        backgroundColor: color,
                        border: color === selectedColor ? '2px solid #000' : 'none',
                      }}
                      onClick={() => handleColorChange(color)}
                    ></li>
                  ))}
                </ul>
              </div>
              <div>
                <button className="create-btn" onClick={handleCreate}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="saved-notes">
        <ul>
          {notes.map((note, index) => (
            <li key={index} onClick={() => handleGroupClick(index)}>
              <div className="circle-bg">
                <div
                  className="circle"
                  style={{ backgroundColor: note.selectedColor, margin: '10px' }}
                >
                  {getInitials(note.groupName)}
                </div>
              </div>
              <span style={{ fontSize: '18px', fontWeight: '500', padding: '10px' }}>
                {' '}
                {note.groupName}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="create-notes-button">
        <button className="btn" onClick={() => setFormOpen(!isFormOpen)}>
          +
        </button>
      </div>
    </div>
  );
}

export default CreateNotesAndPopup;
