import { useState, useRef } from "react";
import TargetingBox from "./TargetingBox";
import CharacterMarker from "./CharacterMarker";
import waldoImage from "../assets/waldo.jpg";

function GameBoard({ characters, foundMarkers, foundIds, onGuess, onImageClick }) {
  const [target, setTarget] = useState(null);
  const imageRef = useRef(null);

  function handleClick(e) {
    if (target) {
      setTarget(null);
      return;
    }

    const rect = imageRef.current.getBoundingClientRect();
    const pixelX = e.clientX - rect.left;
    const pixelY = e.clientY - rect.top;
    const percentX = pixelX / rect.width;
    const percentY = pixelY / rect.height;

    setTarget({ pixelX, pixelY, percentX, percentY });
    onImageClick();
  }

  function handleGuess(character) {
    onGuess(character, target.percentX, target.percentY, target.pixelX, target.pixelY);
    setTarget(null);
  }

  const remaining = characters.filter((c) => !foundIds.includes(c.id));

  return (
    <div
      style={{ position: "relative", display: "inline-block", cursor: "crosshair" }}
      onClick={handleClick}
    >
      <img
        ref={imageRef}
        src={waldoImage}
        alt="Where's Waldo"
        style={{ display: "block", maxWidth: "100%", userSelect: "none" }}
        draggable={false}
      />

      {target && (
        <TargetingBox
          x={target.pixelX}
          y={target.pixelY}
          characters={remaining}
          onGuess={handleGuess}
        />
      )}

      {foundMarkers.map((marker) => (
        <CharacterMarker
          key={marker.id}
          x={marker.pixelX}
          y={marker.pixelY}
          name={marker.name}
        />
      ))}
    </div>
  );
}

export default GameBoard;