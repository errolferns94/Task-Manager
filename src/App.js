import './App.css';
import { useLayoutEffect, useState } from 'react';
import { Dropdown } from 'bootstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NotesApp />
      </header>
    </div>
  );
}

const NotesApp = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('low'); // Added state for priority

  const addNote = () => {
    if (note.trim() !== '') {
      if (editIndex === null) {
        setNotes([...notes, { note, taskDescription, taskPriority }]);
      } else {
        const updatedNotes = [...notes];
        updatedNotes[editIndex] = { note, taskDescription, taskPriority };
        setNotes(updatedNotes);
        setEditIndex(null);
      }
      setNote('');
      setTaskDescription('');
      setTaskPriority('low'); // Reset priority after adding/editing
    }
  };

  const editNote = (index) => {
    const { note, taskDescription, taskPriority } = notes[index];
    setNote(note);
    setTaskDescription(taskDescription);
    setTaskPriority(taskPriority);
    setEditIndex(index);
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const doneNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    setEditIndex(null);
  };

  return (
    <div>
      <h1>TASK MANAGER</h1>

      Enter task:
      <input
        
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div>
        Description:
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>
      <div>
        Priority:
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button onClick={addNote}>Add</button>
      <ul>
        {notes.map((task, index) => (
          <div key={index}>
            <li>
              {task.note} - Description: {task.taskDescription} - Priority: {task.taskPriority}
              <button onClick={() => editNote(index)}>Edit</button>
              <button onClick={() => doneNote(index)}>Done</button>
              <button onClick={() => deleteNote(index)}>Delete</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;

