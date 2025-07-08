import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const NoteForm = ({ onNoteCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/notes",
        { title, content },
        { headers: { Authorization: token } }
      );
      toast.success("📝 Note created!");
      setTitle("");
      setContent("");
      if (onNoteCreated) onNoteCreated(res.data);
    } catch (err) {
      console.error("Error creating note: ", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-md border border-gray-200 p-6 rounded-2xl shadow-xl max-w-3xl mx-auto mt-6 sticky top-0 z-40"
    >
      <h2 className="text-2xl font-bold text-center text-purple-700 mb-4 tracking-wide">
        ➕ Create a New Note
      </h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Content"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        required
      ></textarea>

      <div className="text-right">
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-semibold transition duration-200 shadow-md"
        >
          Save Note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
