import React from "react";
import NoteList from "../components/NoteList";

const Notes = ({ refresh }) => {
  return (
    <div className="container mx-auto px-4 py-6 max-h-[80vh] overflow-y-auto">
      <NoteList key={refresh} />
    </div>
  );
};

export default Notes;
