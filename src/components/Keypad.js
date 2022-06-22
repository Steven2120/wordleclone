import React, { useEffect, useState } from "react";

export default function Keypad({ usedKeys, handleKeyup }) {
  const defaultLetters = [
    { key: "a" },
    { key: "b" },
    { key: "c" },
    { key: "d" },
    { key: "e" },
    { key: "f" },
    { key: "g" },
    { key: "h" },
    { key: "i" },
    { key: "j" },
    { key: "k" },
    { key: "l" },
    { key: "m" },
    { key: "n" },
    { key: "o" },
    { key: "p" },
    { key: "q" },
    { key: "r" },
    { key: "s" },
    { key: "t" },
    { key: "Enter" },
    { key: "u" },
    { key: "v" },
    { key: "w" },
    { key: "x" },
    { key: "y" },
    { key: "z" },
    { key: "Delete" },
  ];

  const [letters, setLetters] = useState(defaultLetters);

  // ********** For use with a json file and json-server **********

  // ********** For use with a json file and json-server **********

  return (
    <div className="keypad">
      {letters &&
        letters.map((letter) => {
          const color = usedKeys[letter.key];
          return (
            <div
              key={letter.key}
              className={color}
              onClick={() => {
                handleKeyup({ key: letter.key });
              }}
            >
              {letter.key}
            </div>
          );
        })}
    </div>
  );
}
