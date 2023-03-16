import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
import Main from "./Components/Main/Main";
import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
  // set states to be used in both main and sidebar
  const [journal, setJournal] = useState(
    JSON.parse(localStorage.journal) || []
  );
  const [activeNote, setActiveNote] = useState(false);

  // to store inpute in local storage to parse on refresh

  useEffect(() => {
    localStorage.setItem("journal", JSON.stringify(journal));
  }, [journal]);

  // function to serve on click adding note to the side bar
  const addNote = () => {
    // object to house all new entry
    const newJournal = {
      id: uuidv4(),
      title: "untitled",
      body: "",
      lastModified: Date.now(),
    };

    // putting new entry with objects in the journal array
    setJournal([newJournal, ...journal]);
    console.log("I just made a new journal entry");
  };

  // to handle entry in selected journal 
  const update = (updatedEntry) => {
    const updatedJournal = journal.map((entry) => {
      if (entry.id === activeNote) {
        return updatedEntry;
      }

      return entry;
    });

    setJournal(updatedJournal);
  };

  // handles deleting a journal entry
  const deleteEntry = (id) => {
    const deleteJournal = journal.filter((entry) => entry.id !== id);
    setJournal(deleteJournal)
  };

  // to select the journal entry you're currently working on
  const getActiveNote = () => {
    return journal.find((entry) => entry.id === activeNote);
  };

  return (
    <div className="App">
      <Sidebar
        journal={journal}
        addNote={addNote}
        deleteEntry={deleteEntry}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />

      <Main activeNote={getActiveNote()} update={update} />
    </div>
  );
}

export default App;
