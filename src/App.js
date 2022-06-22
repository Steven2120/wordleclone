import React, { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import { answerList } from "./components/AnswerList";
import { wordList } from "./components/WordList";
import useWordle from "./hooks/useWordle";

function App() {
  const [solution, setSolution] = useState(null);

  const { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup } =
    useWordle(solution);

  useEffect(() => {
    const randomSolution =
      answerList[Math.floor(Math.random() * answerList.length)];
    setSolution(randomSolution.word);
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
