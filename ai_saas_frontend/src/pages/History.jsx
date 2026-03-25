import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [chats, setChats] = useState([]);
  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/chats`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setChats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <h2>Chat History</h2>
        <button
          style={styles.logout}
          onClick={() => {
            localStorage.removeItem("token");
            window.location = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* Chat List */}
      <div style={styles.list}>
        {chats.length === 0 ? (
          <p>No chats yet...</p>
        ) : (
          chats.map((chat, i) => (
            <div
              key={i}
              style={styles.card}
              onClick={() => {
                localStorage.setItem("selectedChat", JSON.stringify(chat));
                window.location = "/chat";
              }}
            >

              <div style={styles.userMsg}>
                <strong>You:</strong> {chat.message}
              </div>

              <div style={styles.aiMsg}>
                <strong>AI:</strong> {chat.response}
              </div>

              <div style={styles.time}>
                {new Date(chat.createdAt).toLocaleString()}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f5f7fb",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  logout: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  userMsg: {
    background: "#4f46e5",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
  },

  aiMsg: {
    background: "#e2e8f0",
    padding: "10px",
    borderRadius: "8px",
  },

  time: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: "8px",
  },
};

export default History;