import React from "react";
import Confetti from "./Confetti.jsx";
import "./ResultsScreen.css";

export default function ResultsScreen({
  wpm,
  accuracy,
  correctChars,
  wrongChars,
  isFirstTest,
  isNewPb,
  onRestart,
}) {
  const getTitle = () => {
    if (isNewPb && isFirstTest) return "Baseline Established!";
    if (isNewPb) return "High Score Smashed!";
    return "Test Complete!";
  };

  const getSubtitle = () => {
    if (isNewPb && isFirstTest)
      return "You've set the bar. Now the real challenge begins\u2014time to beat it.";
    if (isNewPb)
      return "You're getting faster. That was incredible typing.";
    return "Solid run. Keep pushing to beat your high score.";
  };

  const getButtonText = () => {
    if (isNewPb) return "Beat This Score";
    return "Go Again";
  };

  return (
    <div className="results-screen">
      {isNewPb && !isFirstTest && <Confetti />}

      <div className="results-content">
        {isNewPb && !isFirstTest ? (
          <img
            src="/images/icon-new-pb.svg"
            alt="New personal best"
            className="results-icon results-icon--pb"
          />
        ) : (
          <div className="results-icon-circle">
            <img src="/images/icon-completed.svg" alt="Completed" />
          </div>
        )}

        <h2 className="results-title">{getTitle()}</h2>
        <p className="results-subtitle">{getSubtitle()}</p>

        <div className="results-stats">
          <div className="results-stat-box">
            <span className="results-stat-label">WPM:</span>
            <span className="results-stat-value">{wpm}</span>
          </div>
          <div className="results-stat-box">
            <span className="results-stat-label">Accuracy:</span>
            <span className={`results-stat-value ${accuracy < 100 ? "results-stat-value--red" : "results-stat-value--green"}`}>
              {accuracy}%
            </span>
          </div>
          <div className="results-stat-box">
            <span className="results-stat-label">Characters</span>
            <span className="results-stat-value">
              <span className="results-stat-value--green">{correctChars}</span>
              <span className="results-stat-value--red">/{wrongChars}</span>
            </span>
          </div>
        </div>

        <button className="results-btn" onClick={onRestart}>
          {getButtonText()} <img src="/images/icon-restart.svg" alt="" />
        </button>
      </div>

      <img src="/images/pattern-star-1.svg" alt="" className="results-star results-star--1" />
      <img src="/images/pattern-star-2.svg" alt="" className="results-star results-star--2" />
    </div>
  );
}
