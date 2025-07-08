import React, { useEffect, useState } from "react";
import NoteList from "./components/NoteList.jsx";
import NoteForm from "./components/NoteForm.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: token },
        })
        .then((res) => {
          setUser(res.data.user);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
        <p className="text-lg font-medium text-slate-600">Loading...</p>
      </div>
    );

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 font-sans">
        <Navbar user={user} setUser={setUser} />
        <ToastContainer position="top-right" autoClose={1500} />

        <Routes>
          {/* Redirect base "/" to /notes */}
          <Route path="/" element={<Navigate to="/notes" />} />

          {/* Create Note Page */}
          <Route
            path="/create"
            element={
              <PrivateRoute user={user} loading={loading}>
                <div className="container mx-auto px-4 py-6">
                  <NoteForm onNoteCreated={() => setRefresh(!refresh)} />
                </div>
              </PrivateRoute>
            }
          />

          {/* Notes List Page */}
          <Route
            path="/notes"
            element={
              <PrivateRoute user={user} loading={loading}>
                <div className="container mx-auto px-4 py-6 max-h-[80vh] overflow-y-auto">
                  <NoteList key={refresh} />
                </div>
              </PrivateRoute>
            }
          />

          {/* Auth Pages */}
          <Route
            path="/login"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <Login setUser={setUser} />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <Register setUser={setUser} />
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
