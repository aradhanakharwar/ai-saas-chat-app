import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  console.log("ffffffffff",token);
  

  const sendMessage = async () => {
    if (!message) return;

    const userMsg = { type: "user", text: message };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:5000/api/chat",
        { message },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const aiMsg = { type: "ai", text: res.data.reply };

      setMessages((prev) => [...prev, aiMsg]);

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("selectedChat");

    if (saved) {
      const chat = JSON.parse(saved);

      // show in chat window
      setMessages([
        { type: "user", text: chat.message },
        { type: "ai", text: chat.response },
      ]);

      // also update sidebar (optional)
      setHistory((prev) => [chat, ...prev]);
      console.log("ddddddddddddddd", history);

      localStorage.removeItem("selectedChat");
    }

    fetchHistory();

  }, []);


  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/chats", // ✅ SAME AS HISTORY PAGE
        {
          headers: {
            Authorization: token, // same as yours
          },
        }
      );

      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h3>Chats</h3>

        {/* New Chat */}
        <p
          style={styles.chatItem}
          onClick={() => setMessages([])}
        >
          + New Chat
        </p>

        {/* History list */}
        {history.length === 0 ? (
          <p style={{ color: "#ccc" }}>No chats yet</p>
        ) : (
          history.slice(0, 10).map((e, i) => (
            <p
              key={i}
              style={styles.chatItem}
              onClick={() => {
                setMessages([
                  { type: "user", text: e.message },
                  { type: "ai", text: e.response },
                ]);
              }}
            >
              {e.message.slice(0, 25)}...
            </p>
          ))
        )}
      </div>

      {/* Main Chat */}
      <div style={styles.main}>


        {/* Messages */}
        <div style={styles.chatBox}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={
                m.type === "user"
                  ? styles.userMsg
                  : styles.aiMsg
              }
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={styles.inputArea}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            style={styles.input}
          />
          <button onClick={sendMessage} style={styles.sendBtn}>
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#f5f7fb",
  },

  sidebar: {
    width: "250px",
    background: "#1e293b",
    color: "#fff",
    padding: "20px",
  },

  chatItem: {
    background: "#334155",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
    cursor: "pointer",
    color: "white"
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    padding: "15px 20px",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
  },

  logout: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  chatBox: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  userMsg: {
    alignSelf: "flex-end",
    background: "#4f46e5",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "15px",
    maxWidth: "60%",
  },

  aiMsg: {
    alignSelf: "flex-start",
    background: "#e2e8f0",
    padding: "10px 15px",
    borderRadius: "15px",
    maxWidth: "60%",
  },

  inputArea: {
    display: "flex",
    padding: "10px",
    background: "#fff",
    borderTop: "1px solid #ddd",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  sendBtn: {
    marginLeft: "10px",
    padding: "10px 15px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Chat;