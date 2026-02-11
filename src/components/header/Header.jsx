import Stats from "./stats/Stats";
import Selectors from "./selectors/Selectors";
import "./Header.css";

export default function Header({ wpm, accuracy, startTime, difficulty, mode, setDifficulty, setMode, gameStart }) {
  return (
    <header className="game-header">
      <Stats wpm={wpm} accuracy={accuracy} startTime={startTime} mode={mode} />
      <Selectors difficulty={difficulty} mode={mode} setDifficulty={setDifficulty} setMode={setMode} gameStart={gameStart} />
    </header>
  );
}
