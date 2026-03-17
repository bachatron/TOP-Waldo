import { useState, useEffect } from "react";

function Timer({ running }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div style={{ padding: "12px 24px", fontSize: "1.4rem", fontWeight: "bold" }}>
      ⏱ {mins}:{secs}
    </div>
  );
}

export default Timer;