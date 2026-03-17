function CharacterMarker({ x, y, name }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - 20,
        top: y - 20,
        width: 40,
        height: 40,
        border: "3px solid lime",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,255,0,0.2)",
      }}
      title={name}
    >
      ✓
    </div>
  );
}

export default CharacterMarker;