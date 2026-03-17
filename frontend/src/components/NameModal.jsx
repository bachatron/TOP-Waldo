import { useState } from "react";

function NameModal({ time, onSubmit }) {
  const [name, setName] = useState("");

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
    }}>
      <div style={{
        background: "#16213e",
        padding: "40px",
        borderRadius: "12px",
        textAlign: "center",
        minWidth: "300px",
      }}>
        <h2 style={{ marginBottom: "8px" }}>🎉 You found everyone!</h2>
        <p style={{ marginBottom: "24px", color: "#aaa" }}>Your time: {time}s</p>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            marginBottom: "16px",
            width: "100%",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={() => name.trim() && onSubmit(name.trim())}
          style={{
            padding: "10px 28px",
            background: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            width: "100%",
          }}
        >
          Submit Score
        </button>
      </div>
    </div>
  );
}

export default NameModal;