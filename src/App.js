import './App.css';
import React, { useState, useEffect, useMemo } from "react";

function App() {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [isFirstMove, setIsFirstMove] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // generateRandomCards Function: This function generates an array of numbers representing the card values. It ensures that there are pairs of each number (matching cards), shuffles them randomly, and returns the shuffled array.

  const generateRandomCards = () => {
    const numbers = Array.from({ length: 32 }, (_, index) => Math.floor(index / 2) + 1);
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
    return shuffledNumbers;
  };

  //cards State Variable: The cards variable is initialized using useMemo. It contains the shuffled card values for the game and is memoized to prevent unnecessary re-computation.
  const cards = useMemo(() => generateRandomCards(), []);


  //handleCardClick Function:This function is called when a card is clicked. It checks if the game is complete or if the clicked card is already flipped or matched.
  //If not, it handles the card click:Adds the card index to the flippedCards array.
  //If it's the first move, it starts the game timer.
  const handleCardClick = (cardIndex) => {
    if (isGameComplete || flippedCards.includes(cardIndex) || matchedCards.includes(cardIndex)) return;

    if (flippedCards.length < 2) {
      setFlippedCards((prevFlippedCards) => [...prevFlippedCards, cardIndex]);

      // Start the timer on the first move
      if (isFirstMove) {
        setIsFirstMove(false);
        const id = startTimer();
        setIntervalId(id);
      }
    }
  };


  //startTimer Function:
  //This function starts a timer that increments the timer state every second and returns the timer interval ID.

  
  const startTimer = () => {
    const id = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    return id;
  };


  //useEffect for Matching Cards:
//This useEffect watches for changes in flippedCards. When two cards are flipped, it checks if they match (have the same value). If they do, it updates the score and marks them as matched. If not, it flips them back after a delay.
  useEffect(() => {
    // Check if all cards are matched and stop the timer
    if (matchedCards.length === cards.length) {
      setIsGameComplete(true);
      clearInterval(intervalId); // Stop the timer when the game is complete
      showCongratulations();
    }
  }, [matchedCards, cards, intervalId]);

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


  //showCongratulations Function: This function displays an alert message when the game is completed, informing the player that they've matched all the cards.
  const showCongratulations = () => {
    alert("Congratulations! You matched all cards!");
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="score">Score: {score}</div>
      <div className="timer">Time: {timer} seconds</div>
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
