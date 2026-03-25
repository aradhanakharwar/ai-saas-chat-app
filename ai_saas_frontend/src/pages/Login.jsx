import { useState } from "react";
import axios from "axios";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/login`, form);
            localStorage.setItem("token", res.data.token);
            alert("Login successful");
            window.location = "/chat";
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>Welcome Back 👋</h2>

                <input
                    type="email"
                    placeholder="Enter email"
                    style={styles.input}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    style={styles.input}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button style={styles.button} onClick={handleLogin}>
                    Login
                </button>

                <p style={styles.text}>
                    Don’t have an account?{" "}
                    <a href="/register" style={styles.link}>
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
    },
    card: {
        width: "350px",
        padding: "30px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
    heading: {
        marginBottom: "20px",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
    },
    button: {
        width: "100%",
        padding: "10px",
        border: "none",
        borderRadius: "8px",
        background: "#4CAF50",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
    },
    text: {
        marginTop: "15px",
    },
    link: {
        color: "#4CAF50",
        textDecoration: "none",
    },
};

export default Login;