import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import { AuthProvider } from "./context/AuthContext";
import Pinned from "./pages/pinned/Pinned";
import Register from "./pages/register/Registeruser";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/profile" index element={<Profile />} />
          <Route path="/" index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/pines' element={<Pinned />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
