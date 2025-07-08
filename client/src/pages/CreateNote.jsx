import React from "react";
import NoteForm from "../components/NoteForm";

const CreateNote = ({ onNoteCreated }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <NoteForm onNoteCreated={onNoteCreated} />
    </div>
  );
};

export default CreateNote;
