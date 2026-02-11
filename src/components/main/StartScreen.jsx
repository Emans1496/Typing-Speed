import React, { useEffect, useState, useRef } from "react";
import TopBar from "../topbar/TopBar.jsx";
import Header from "../header/Header.jsx";
import TextData from "../../data.json";
import GameScreen from "../game/GameScreen.jsx";
import ResultsScreen from "../results/ResultsScreen.jsx";

function getRandomParagraph(difficulty) {
  const index = Math.floor(Math.random() * 10);
  return TextData[difficulty][index].text;
}

export default function StartScreen() {
  const [pbScore, setPbScore] = useState(() => {
    const saved = localStorage.getItem("typingTestPB");
    return saved ? Number(saved) : 0;
  });
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState(60);
  const [difficulty, setDifficulty] = useState("easy");
  const [mode, setMode] = useState("timed");
  const [paragraph, setParagraph] = useState(() => getRandomParagraph("easy"));
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [wrongChars, setWrongChars] = useState(0);
  const [isFirstTest, setIsFirstTest] = useState(() => {
    return !localStorage.getItem("typingTestPB");
  });
  const [isNewPb, setIsNewPb] = useState(false);
  const gameStartTimeRef = useRef(null);

  function handleDifficultyChange(newDifficulty) {
    setDifficulty(newDifficulty);
    setParagraph(getRandomParagraph(newDifficulty));
  }

  function handleModeChange(newMode) {
    setMode(newMode);
    setStartTime(newMode === "timed" ? 60 : null);
  }

  function handleGameEnd(finalWpm, finalAccuracy, correct, wrong) {
    setWpm(finalWpm);
    setAccuracy(finalAccuracy);
    setCorrectChars(correct);
    setWrongChars(wrong);
    setGameStart(false);
    setGameOver(true);

    if (finalWpm > pbScore) {
      setIsFirstTest(pbScore === 0);
      setIsNewPb(true);
      setPbScore(finalWpm);
      localStorage.setItem("typingTestPB", String(finalWpm));
    } else {
      setIsNewPb(false);
      setIsFirstTest(false);
    }
  }

  function handleRestart() {
    setGameStart(false);
    setGameOver(false);
    setWpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setWrongChars(0);
    gameStartTimeRef.current = null;
    setStartTime(mode === "timed" ? 60 : null);
    setParagraph(getRandomParagraph(difficulty));
  }

  function handleStartGame() {
    setGameStart(true);
    gameStartTimeRef.current = Date.now();
  }

  // Timer countdown for timed mode
  useEffect(() => {
    if (!gameStart || mode !== "timed") return;
    const intervalId = setInterval(() => {
      setStartTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [gameStart, mode]);

  return (
    <main>
      <TopBar pbScore={pbScore} />
      {!gameOver ? (
        <>
          <Header
            wpm={wpm}
            accuracy={accuracy}
            startTime={startTime}
            difficulty={difficulty}
            mode={mode}
            setDifficulty={handleDifficultyChange}
            setMode={handleModeChange}
            gameStart={gameStart}
          />
          <GameScreen
            paragraph={paragraph}
            difficulty={difficulty}
            gameStart={gameStart}
            handleStartGame={handleStartGame}
            handleGameEnd={handleGameEnd}
            handleRestart={handleRestart}
            wpm={wpm}
            setWpm={setWpm}
            setAccuracy={setAccuracy}
            startTime={startTime}
            accuracy={accuracy}
            mode={mode}
            gameStartTimeRef={gameStartTimeRef}
          />
        </>
      ) : (
        <ResultsScreen
          wpm={wpm}
          accuracy={accuracy}
          correctChars={correctChars}
          wrongChars={wrongChars}
          isFirstTest={isFirstTest}
          isNewPb={isNewPb}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}
