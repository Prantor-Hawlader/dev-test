"use client";

import { useState } from "react";

const AlphabetTiles = () => {
  const [outputString, setOutputString] = useState("");

  const changeString = (string) => {
    return string.replace(/(.)\1{2,}/g, (match) =>
      "_".repeat(Math.floor(match.length / 3))
    );
  };
  const handleTileClick = (letter) => {
    setOutputString((prev) => {
      const newString = prev + letter;
      return changeString(newString);
    });
  };
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <>
      <h1 className="my-2 text-3xl text-violet-500 text-bold font-mono">
        Alphabet Tile Interaction
      </h1>
      <div className="grid grid-cols-6 gap-5 max-w-xl mx-auto">
        {alphabet.map((letter) => (
          <div
            key={letter}
            className="bg-green-500 text-white p-5 text-2xl text-center
            cursor-pointer select-none rounded transition-colors
            duration-300 ease-in-out hover:bg-violet-500"
            onClick={() => handleTileClick(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div>
        <p className="text-2xl font-bold"> Output String:</p>
        <span className="my-2 text-3xl text-violet-500 text-bold font-mono">
          {outputString}
        </span>
      </div>
    </>
  );
};

export default AlphabetTiles;
