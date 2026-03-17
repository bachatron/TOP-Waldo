import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

// Called when game loads — starts the timer on the server
export async function startGame() {
  const res = await api.post("/game_sessions");
  return res.data; // { id, token }
}

// Called when user guesses a character
export async function checkGuess(sessionId, token, characterId, x, y) {
  const res = await api.post(`/game_sessions/${sessionId}/check`, {
    token,
    character_id: characterId,
    x,
    y,
  });
  return res.data; // { correct, character_id }
}

// Called when all characters are found
export async function completeGame(sessionId, token, playerName) {
  const res = await api.patch(`/game_sessions/${sessionId}/complete`, {
    token,
    player_name: playerName,
  });
  return res.data; // { time, player_name }
}

// Called to fetch leaderboard
export async function fetchLeaderboard() {
  const res = await api.get("/leaderboard");
  return res.data; // [{ player_name, time }]
}

export async function fetchCharacters() {
  const res = await api.get("/characters");
  return res.data;
}