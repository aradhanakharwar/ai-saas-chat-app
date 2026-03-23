import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import History from "./pages/History";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {!token && (
          <>
            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />} />
          </>
        )}
        {token && (
          <>
            <Route path="/chat" element={<Chat />} />
            <Route path="/history" element={<History />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;