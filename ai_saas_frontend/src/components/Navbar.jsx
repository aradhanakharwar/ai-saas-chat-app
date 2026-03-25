import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location = "/";
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>🤖 AI Assistant</h2>

      <div style={styles.links}>
        {token && (
          <>
        <Link to="/chat" style={styles.link}>Chat</Link>
        <Link to="/history" style={styles.link}>History</Link>
        </>
        )}

        {token && (
          <button style={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#111827",
    color: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },

  logo: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  link: {
    textDecoration: "none",
    color: "#d1d5db",
    fontSize: "15px",
    transition: "0.3s",
  },

  logout: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default Navbar;