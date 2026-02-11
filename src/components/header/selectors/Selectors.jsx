import { useState, useRef, useEffect } from "react";
import "./Selectors.css";

function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="dropdown-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {selectedOption?.label}
        <img src="/images/icon-down-arrow.svg" alt="" className={`dropdown-arrow ${open ? "dropdown-arrow--open" : ""}`} />
      </button>
      {open && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <label key={option.value} className="dropdown-option">
              <input
                type="radio"
                name={label}
                checked={value === option.value}
                onChange={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              />
              <span className="dropdown-radio" />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const MODE_OPTIONS = [
  { value: "timed", label: "Timed (60s)" },
  { value: "passage", label: "Passage" },
];

export default function Selectors({
  difficulty,
  mode,
  setDifficulty,
  setMode,
  gameStart,
}) {
  return (
    <>
      {/* Desktop: inline buttons */}
      <div className="selectors selectors--desktop">
        <span className="selector-label">Difficulty:</span>
        <div className="selector-group">
          {DIFFICULTY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`selector-btn ${difficulty === opt.value ? "active" : ""}`}
              onClick={() => setDifficulty(opt.value)}
              disabled={gameStart}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <span className="selector-label">Mode:</span>
        <div className="selector-group">
          {MODE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`selector-btn ${mode === opt.value ? "active-blue" : ""}`}
              onClick={() => setMode(opt.value)}
              disabled={gameStart}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: dropdowns */}
      <div className="selectors selectors--mobile">
        <Dropdown
          label="difficulty"
          value={difficulty}
          options={DIFFICULTY_OPTIONS}
          onChange={setDifficulty}
        />
        <Dropdown
          label="mode"
          value={mode}
          options={MODE_OPTIONS}
          onChange={setMode}
        />
      </div>
    </>
  );
}
