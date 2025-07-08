# 📝 MERN Notes App

A full-stack **Note-Taking Web Application** built using the **MERN stack (MongoDB, Express, React, Node.js)**. This app allows users to register, log in securely using JWT authentication, and create, edit, delete, and view notes — all styled beautifully with **Tailwind CSS**.

---

## 🌟 Features

- ✅ User Registration and Login with JWT
- ✅ Secure Password Hashing with Bcrypt
- ✅ Protected Routes using Middleware
- ✅ Create, Edit, and Delete Notes
- ✅ Notes are private and user-specific
- ✅ Form Validations & Error Handling
- ✅ Toast Notifications
- ✅ Responsive UI using Tailwind CSS
- ✅ Cool hover effects & animations
- ✅ Sticky NoteForm and NoteList layout

---

## 🛠️ Technologies Used

### 🔹 Frontend
- React.js
- Axios
- React Router DOM
- React Toastify
- Tailwind CSS

### 🔹 Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Bcrypt.js
- dotenv
- cors

---

## 📁 Folder Structure

MERN-Notes-app/
├── client/ # React Frontend
├── server/ # Express + MongoDB Backend
├── .gitignore
├── README.md


---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

# 1. Clone the repository
git clone https://github.com/Divyansh-Raghav/MERN-Notes-app.git
cd MERN-Notes-app

# 2. Setup the Backend
cd server
npm install

# 3. Create a .env file in /server and add:
# (Replace with your actual credentials)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# 4. Start the backend server
npm run dev

# 5. Open a new terminal for the Frontend
cd ../client
npm install

# 6. Start the frontend
npm run dev

# 7. Open your browser and go to:
http://localhost:5173


