
import './App.css';
import React, { useState, useEffect, useMemo } from "react";

function App() {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);

  const generateRandomCards = () => {
    const numbers = Array.from({ length: 32 }, (_, index) => Math.floor(index / 2) + 1);
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
    return shuffledNumbers;
  };

  const cards = useMemo(() => generateRandomCards(), []);

  const handleCardClick = (cardIndex) => {
    if (flippedCards.includes(cardIndex) || matchedCards.includes(cardIndex)) return; 

    if (flippedCards.length < 2) {
      setFlippedCards((prevFlippedCards) => [...prevFlippedCards, cardIndex]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
     
      const [cardIndex1, cardIndex2] = flippedCards;
      const cardValue1 = cards[cardIndex1];
      const cardValue2 = cards[cardIndex2];

      if (cardValue1 === cardValue2) {
        
        setScore((prevScore) => prevScore + 1);
        setMatchedCards((prevMatchedCards) => [...prevMatchedCards, cardIndex1, cardIndex2]);
        setFlippedCards([]);
      } else {
        
        setTimeout(() => {
          setFlippedCards([]);
        }, 800);
      }
    }
  }, [flippedCards, cards]);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="score">Score: {score}</div>
      <div className="game-board">
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(index);
          const isMatched = matchedCards.includes(index);

          return (
            <div
              key={index}
              className={`card ${isFlipped || isMatched ? "flipped" : ""}`}
              onClick={() => handleCardClick(index)}
            >
              {isFlipped || isMatched ? card : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
