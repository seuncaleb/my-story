import ReactMarkdown from "react-markdown";
import './main.css';

function Main({ activeNote, update }) {
  // to display on the screen when no jounal entry has been made yet
  if (!activeNote)
    return <div className="no-active-note">No saved memories yet</div>;

  // to handle input in text area
  const onEdit = (key, value) => {
    update({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          value={activeNote.title}
          onChange={(e) => onEdit("title", e.target.value)}
          autoFocus
        />
        <textarea
          id="body"
          placeholder="What's on your mind"
          value={activeNote.body}
          onChange={(e) => onEdit("body", e.target.value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown
          className="markdown-preview"
          children={activeNote.body}
        />
       
      </div>
    </div>
  );
}

export default Main;
