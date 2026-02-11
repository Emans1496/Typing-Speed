import "./Stats.css";

export default function Stats({ wpm, accuracy, startTime, mode }) {
  return (
    <div className="stats">
      <div className="stat-item">
        <span className="stat-label">WPM:</span>
        <span className="stat-value">{wpm}</span>
      </div>
      <div className="stat-divider">|</div>
      <div className="stat-item">
        <span className="stat-label">Accuracy:</span>
        <span className={`stat-value ${accuracy < 100 ? "stat-value--red" : ""}`}>
          {accuracy}%
        </span>
      </div>
      {mode === "timed" && startTime !== null && startTime !== undefined ? (
        <>
          <div className="stat-divider">|</div>
          <div className="stat-item">
            <span className="stat-label">Time:</span>
            <span className="stat-value">
              {Math.floor(startTime / 60)}:{String(startTime % 60).padStart(2, "0")}
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}
