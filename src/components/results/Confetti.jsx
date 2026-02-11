import React from "react";
import "./Confetti.css";

export default function Confetti() {
  return (
    <div className="confetti-container" aria-hidden="true">
      {Array.from({ length: 60 }, (_, i) => (
        <div key={i} className="confetti-piece" />
      ))}
    </div>
  );
}
