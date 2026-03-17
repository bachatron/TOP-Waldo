function Leaderboard({ entries, time, onPlayAgain }) {
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
        minWidth: "340px",
        textAlign: "center",
      }}>
        <h2 style={{ marginBottom: "8px", fontSize: "1.8rem" }}>🏆 Leaderboard</h2>
        {time && (
          <p style={{ color: "#2ecc71", marginBottom: "24px" }}>
            Your time: <strong>{time}s</strong>
          </p>
        )}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #0f3460" }}>
              <th style={{ padding: "8px" }}>#</th>
              <th style={{ padding: "8px" }}>Name</th>
              <th style={{ padding: "8px" }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #0f3460" }}>
                <td style={{ padding: "8px" }}>{i + 1}</td>
                <td style={{ padding: "8px" }}>{entry.player_name}</td>
                <td style={{ padding: "8px" }}>{entry.time}s</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={onPlayAgain}
          style={{
            padding: "10px 28px",
            background: "#0f3460",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;