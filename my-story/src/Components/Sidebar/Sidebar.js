import './Sidebar.css';
function Sidebar({ journal, addNote, deleteEntry, activeNote, setActiveNote }) {

  // to sort on edit 
  const sortJournal = journal.sort((a, b) => b.lastModified - a.lastModified);
  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1> Keep those memories </h1>
        <button onClick={addNote}> Add</button>
      </div>
      <div className="app-sidebar-notes">
        {/* maps through the array of journal to display information on each individual entry */}
        {sortJournal.map((entry) => (
          <div key={entry.id}
            className={`app-sidebar-note ${
              entry.id === activeNote && "active"
            }`}
            onClick={() => setActiveNote(entry.id)}>
            <div className="sidebar-note-title">
              <strong>{entry.title}</strong>
              <button onClick={() => deleteEntry(entry.id)}> Delete </button>
            </div>
            <p> {entry.body.substr(0, 50) + "..."} </p>
            <small className="note-meta">
              {new Date(entry.lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
