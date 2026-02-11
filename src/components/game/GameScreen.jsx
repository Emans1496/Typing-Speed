import React from "react";
import TextBox from "../game/textBox/TextBox.jsx";
import "./GameScreen.css";

export default function GameScreen({
  paragraph,
  gameStart,
  handleStartGame,
  handleGameEnd,
  handleRestart,
  setAccuracy,
  startTime,
  setWpm,
  mode,
  gameStartTimeRef,
}) {
  return (
    <>
      {!gameStart ? (
        <div className="gameContainer" onClick={handleStartGame}>
          <button onClick={handleStartGame} className="buttonStart">
            Start Typing Test
          </button>
          <p className="writeStart">Or click the text and start typing</p>
          <TextBox
            key={paragraph + "-blurred"}
            className="boxBlurred"
            paragraph={paragraph}
            gameStart={gameStart}
            setWpm={setWpm}
            setAccuracy={setAccuracy}
            mode={mode}
            startTime={startTime}
            handleGameEnd={handleGameEnd}
            gameStartTimeRef={gameStartTimeRef}
          />
        </div>
      ) : (
        <div className="gameContainer gameContainer--active">
          <TextBox
            key={paragraph}
            className="boxNotBlurred"
            paragraph={paragraph}
            gameStart={gameStart}
            setAccuracy={setAccuracy}
            startTime={startTime}
            setWpm={setWpm}
            mode={mode}
            handleGameEnd={handleGameEnd}
            gameStartTimeRef={gameStartTimeRef}
          />
          <div className="restart-divider"></div>
          <button className="restartBtn" onClick={handleRestart}>
            Restart Test <img src="/images/icon-restart.svg" alt="" />
          </button>
        </div>
      )}
    </>
  );
}
