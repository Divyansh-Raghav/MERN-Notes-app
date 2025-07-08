import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/notes/${id}`, {
      headers: { Authorization: token },
    });
    toast.info("🗑️ Note deleted");
    fetchNotes();
  };

  const startEdit = (note) => {
    setEditingNoteId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveEdit = async () => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5000/api/notes/${editingNoteId}`,
      {
        title: editTitle,
        content: editContent,
      },
      { headers: { Authorization: token } }
    );
    toast.success("✅ Note updated!");
    setEditingNoteId(null);
    setEditTitle("");
    setEditContent("");
    fetchNotes();
  };

  return (
    <div className="w-full md:w-2/3 max-w-3xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center text-gray-800 tracking-wide mb-6">
        📋 Your Notes
      </h2>

      {notes.length === 0 ? (
        <p className="text-gray-500 text-center mt-6 italic">
          No notes found.
        </p>
      ) : (
        <ul className="space-y-6 pb-10">
          {notes.map((note) => (
            <li
              key={note._id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300"
            >
              {editingNoteId === note._id ? (
                <>
                  <input
                    className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={4}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  ></textarea>
                  <div className="flex gap-3">
                    <button
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition shadow-sm"
                      onClick={saveEdit}
                    >
                      💾 Save
                    </button>
                    <button
                      className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition shadow-sm"
                      onClick={() => setEditingNoteId(null)}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-indigo-700 mb-1">
                    {note.title}
                  </h3>
                  <p className="text-gray-700 mb-2">{note.content}</p>
                  <p className="text-sm text-gray-400 mb-3">
                    Created at: {new Date(note.createdAt).toLocaleString()}
                  </p>
                  <div className="flex gap-3">
                    <button
                      className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm transition shadow-sm"
                      onClick={() => startEdit(note)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-1.5 rounded-md text-sm transition shadow-sm"
                      onClick={() => deleteNote(note._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
