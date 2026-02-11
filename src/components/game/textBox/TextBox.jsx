import React, { useState, useEffect, useRef, useCallback } from "react";
import "./TextBox.css";

export default function TextBox({
  setAccuracy,
  paragraph,
  className,
  gameStart,
  startTime,
  setWpm,
  mode,
  handleGameEnd,
  gameStartTimeRef,
}) {
  const [chars, setChars] = useState(() =>
    paragraph.split("").map((char) => ({ char, state: null }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const textBoxRef = useRef(null);
  const inputRef = useRef(null);
  const mistakeRef = useRef(0);
  const gameEndedRef = useRef(false);

  function calcWpm(index) {
    if (!gameStartTimeRef.current || index === 0) return 0;
    const minutes = (Date.now() - gameStartTimeRef.current) / 60000;
    if (minutes <= 0) return 0;
    return Math.round(index / 5 / minutes);
  }

  function calcAccuracy(index, mistakes) {
    if (index === 0) return 100;
    return Math.round(((index - mistakes) / index) * 100);
  }

  const triggerGameEnd = useCallback(
    (index, mistakes) => {
      if (gameEndedRef.current) return;
      gameEndedRef.current = true;
      const finalWpm = (() => {
        if (!gameStartTimeRef.current || index === 0) return 0;
        const minutes = (Date.now() - gameStartTimeRef.current) / 60000;
        if (minutes <= 0) return 0;
        return Math.round(index / 5 / minutes);
      })();
      const finalAccuracy = calcAccuracy(index, mistakes);
      const correct = index - mistakes;
      handleGameEnd(finalWpm, finalAccuracy, correct, mistakes);
    },
    [handleGameEnd, gameStartTimeRef]
  );

  const processKey = (key) => {
    if (!gameStart || currentIndex >= chars.length) return;

    const isCorrect = key === chars[currentIndex].char;
    if (!isCorrect) {
      mistakeRef.current += 1;
    }

    const newChars = chars.map((charObj, index) => {
      if (index === currentIndex) {
        return { ...charObj, state: isCorrect ? "correct" : "wrong" };
      }
      return charObj;
    });

    const newIndex = currentIndex + 1;
    setChars(newChars);
    setCurrentIndex(newIndex);

    setWpm(calcWpm(newIndex));
    setAccuracy(calcAccuracy(newIndex, mistakeRef.current));

    if (newIndex >= chars.length) {
      triggerGameEnd(newIndex, mistakeRef.current);
    }
  };

  const handleKeyDown = (e) => {
    if (!gameStart) return;
    e.preventDefault();
    const key = e.key;
    if (key.length > 1 && key !== "Backspace") return;
    processKey(key);
  };

  const handleInput = (e) => {
    if (!gameStart) return;
    const value = e.target.value;
    if (value.length > 0) {
      const key = value[value.length - 1];
      processKey(key);
    }
    e.target.value = "";
  };

  // Handle timed mode: timer hits 0
  useEffect(() => {
    if (gameStart && mode === "timed" && startTime === 0) {
      triggerGameEnd(currentIndex, mistakeRef.current);
    }
  }, [startTime, gameStart, mode, currentIndex, triggerGameEnd]);

  // Auto-focus when game starts
  useEffect(() => {
    if (gameStart && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameStart]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      ref={textBoxRef}
      className={`text-box ${className || ""}`}
      onClick={focusInput}
    >
      <input
        ref={inputRef}
        className="text-box-hidden-input"
        type="text"
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
      />
      {chars && chars.length > 0 ? (
        <div className="chars-container">
          {chars.map((charObj, index) => (
            <span
              key={index}
              className={`char ${
                index === currentIndex
                  ? "char-current"
                  : charObj.state === "correct"
                    ? "char-correct"
                    : charObj.state === "wrong"
                      ? "char-wrong"
                      : "char-default"
              }`}
            >
              {charObj.char}
            </span>
          ))}
        </div>
      ) : (
        <p>{paragraph}</p>
      )}
    </div>
  );
}
