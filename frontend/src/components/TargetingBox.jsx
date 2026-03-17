function TargetingBox({ x, y, characters, onGuess }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - 30,
        top: y - 30,
        width: 60,
        height: 60,
        border: "3px solid red",
        borderRadius: "50%",
      }}
    >
      <ul
        style={{
          position: "absolute",
          top: 65,
          left: 0,
          background: "white",
          color: "black",
          listStyle: "none",
          padding: "8px",
          borderRadius: "6px",
          minWidth: "120px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        {characters.map((char) => (
          <li
            key={char.id}
            onClick={() => onGuess(char)}
            style={{ padding: "6px 10px", cursor: "pointer" }}
          >
            {char.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TargetingBox;