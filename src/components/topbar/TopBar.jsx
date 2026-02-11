import React from "react";
import "./TopBar.css";

export default function TopBar({ pbScore }) {
  return (
    <header className="topbar">
      <img
        src="/images/logo-large.svg"
        alt="Typing Speed Test Logo"
        className="topbar-logo topbar-logo--large"
      />
      <img
        src="/images/logo-small.svg"
        alt="Typing Speed Test Logo"
        className="topbar-logo topbar-logo--small"
      />
      <div className="personal-best">
        <img src="/images/icon-personal-best.svg" alt="" />
        <span className="personal-best-label">Personal best:</span>
        <span className="personal-best-label--short">Best:</span>
        <span className="pb-score">{pbScore} WPM</span>
      </div>
    </header>
  );
}
