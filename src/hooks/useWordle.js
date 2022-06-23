import { useState } from "react";
import { answerList } from "../components/AnswerList";
import { wordList } from "../components/WordList";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);

  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);

  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    let solutionArray = [...solution];

    let formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "grey" };
    });

    formattedGuess.forEach((letter, index) => {
      if (solutionArray[index] === letter.key) {
        formattedGuess[index].color = "green";
        solutionArray[index] = null;
      }
    });

    formattedGuess.forEach((letter, index) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        formattedGuess[index].color = "yellow";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];

      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };

      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.key];

        if (letter.color === "green") {
          newKeys[letter.key] = "green";
          return;
        }
        if (letter.color === "yellow" && currentColor !== "green") {
          newKeys[letter.key] = "yellow";
          return;
        }
        if (
          letter.color === "grey" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          newKeys[letter.key] = "grey";
          return;
        }
      });

      return newKeys;
    });

    setCurrentGuess("");
  };

  const handleKeyup = ({ key }) => {
    // console.log(key);

    if (key === "Enter") {
      const isValidGuess = validateGuess();

      if (!isValidGuess) {
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === "Backspace" || key === "Delete") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  const validateGuess = () => {
    if (turn > 5) {
      console.log("You have used all of your guesses");
      return false;
    }
    if (history.includes(currentGuess)) {
      console.log("You have already tried this word");
      return false;
    }
    if (currentGuess.length !== 5) {
      console.log("Word must be 5 characters long");
      return false;
    }
    const isInWordList = wordList.find(({ word }) => {
      return word === currentGuess;
    });
    const isInAnswerList = answerList.find(({ word }) => {
      return word === currentGuess;
    });
    if (!isInWordList && !isInAnswerList) {
      console.log("Word must be in the wordList");
      return false;
    }
    return true;
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyup,
  };
};

export default useWordle;
