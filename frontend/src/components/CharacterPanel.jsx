function CharacterPanel({ characters, foundIds }) {
  return (
    <div style={{
      display: "flex",
      gap: "16px",
      padding: "12px 24px",
      background: "#16213e",
      alignItems: "center"
    }}>
      <span>Find:</span>
      {characters.map((char) => (
        <div
          key={char.id}
          style={{
            padding: "6px 14px",
            borderRadius: "20px",
            background: foundIds.includes(char.id) ? "#2ecc71" : "#e74c3c",
            fontWeight: "bold",
            textDecoration: foundIds.includes(char.id) ? "line-through" : "none",
          }}
        >
          {char.name}
        </div>
      ))}
    </div>
  );
}

export default CharacterPanel;