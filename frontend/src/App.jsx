import { useState, useEffect, useRef } from "react";
import GameBoard from "./components/GameBoard";
import CharacterPanel from "./components/CharacterPanel";
import Timer from "./components/Timer";
import NameModal from "./components/NameModal";
import Leaderboard from "./components/Leaderboard";
import { startGame, checkGuess, completeGame, fetchLeaderboard, fetchCharacters } from "./api";

function App() {
  const [characters, setCharacters] = useState([]);
  const [foundIds, setFoundIds] = useState([]);
  const [foundMarkers, setFoundMarkers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [session, setSession] = useState(null);
  const [showNameModal, setShowNameModal] = useState(false);
  const [finalTime, setFinalTime] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const sessionStarting = useRef(false);

  // Fetch characters and start session on mount
  useEffect(() => {
    async function init() {
      if (sessionStarting.current) return;
      sessionStarting.current = true;
      let retries = 5;
      while (retries > 0) {
        try {
          const [chars, sessionData] = await Promise.all([
            fetchCharacters(),
            startGame(),
          ]);
          setCharacters(chars);
          setSession(sessionData);
          return;
        } catch (error) {
          retries--;
          console.log(`Retrying... ${retries} attempts left`);
          if (retries === 0) {
            console.error("Failed to initialize game:", error);
          } else {
            // Wait 3 seconds before retrying
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        }
      }
    }
  }, []);

  // Check if all characters are found after each guess
  useEffect(() => {
    if (characters.length > 0 && foundIds.length === characters.length) {
      setGameStarted(false);
      setShowNameModal(true);
    }
  }, [foundIds, characters]);

  function handleImageClick() {
    if (!gameStarted && !showNameModal && !showLeaderboard) {
      setGameStarted(true);
    }
  }

  async function handleGuess(character, x, y, pixelX, pixelY) {
    if (!session) return;
    try {
      const data = await checkGuess(session.id, session.token, character.id, x, y);
      if (data.correct) {
        setFeedback({ message: `✅ Found ${character.name}!`, type: "success" });
        setFoundIds((prev) => [...prev, character.id]);
        setFoundMarkers((prev) => [...prev, { id: character.id, name: character.name, pixelX, pixelY }]);
      } else {
        setFeedback({ message: `❌ Wrong spot, keep looking!`, type: "error" });
      }
      setTimeout(() => setFeedback(null), 1500);
    } catch (error) {
      console.error("Guess error:", error);
    }
  }

  async function handleNameSubmit(playerName) {
    try {
      const data = await completeGame(session.id, session.token, playerName);
      setFinalTime(data.time);  // this was already correct
      setShowNameModal(false);
      const entries = await fetchLeaderboard();
      setLeaderboard(entries);
      setShowLeaderboard(true);
    } catch (error) {
      console.error("Complete game error:", error);
    }
  }

  async function handlePlayAgain() {
    setFoundIds([]);
    setFoundMarkers([]);
    setGameStarted(false);
    setFeedback(null);
    setShowLeaderboard(false);
    setFinalTime(null);
    sessionStarting.current = false;
    const [chars, sessionData] = await Promise.all([
      fetchCharacters(),
      startGame(),
    ]);
    setCharacters(chars);
    setSession(sessionData);
  }

  // Show a loading state while fetching
  if (characters.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", gap: "16px" }}>
        <p style={{ fontSize: "1.2rem" }}>⏳ Waking up the server...</p>
        <p style={{ color: "#aaa", fontSize: "0.9rem" }}>Free tier servers sleep after inactivity. This may take up to 60 seconds.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#0f3460",
        padding: "0 16px",
      }}>
        <h1 style={{ fontSize: "1.2rem" }}>🔍 Where's Waldo?</h1>
        <CharacterPanel characters={characters} foundIds={foundIds} />
        <Timer running={gameStarted} />
      </div>

      {/* Feedback */}
      {feedback && (
        <div style={{
          textAlign: "center",
          padding: "8px",
          background: feedback.type === "success" ? "#2ecc71" : "#e74c3c",
          color: "white",
          fontWeight: "bold",
        }}>
          {feedback.message}
        </div>
      )}

      {/* Game */}
      <div style={{ overflowX: "auto" }}>
        <GameBoard
          characters={characters}
          foundMarkers={foundMarkers}
          foundIds={foundIds}
          onGuess={handleGuess}
          onImageClick={handleImageClick}
        />
      </div>

      {/* Modals */}
      {showNameModal && (
        <NameModal time={finalTime} onSubmit={handleNameSubmit} />
      )}
      {showLeaderboard && (
        <Leaderboard entries={leaderboard} time={finalTime} onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
}

export default App;