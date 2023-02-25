import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef(null);
  const [color, setColor] = useState("red")
  const click = color => {
    setColor(color)
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  function startTimer() {
    if (!timerRunning) {
      setTimerRunning(true);
      intervalRef.current = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    }
  }

  function stopTimer() {
    if (timerRunning) {
      setTimerRunning(false);
      clearInterval(intervalRef.current);
    }
  }

  function resetTimer() {
    setTimeLeft(25 * 60);
    setTimerRunning(false);
    clearInterval(intervalRef.current);
  }

  function skipTimer() {
    setTimeLeft(0);
    setTimerRunning(false);
   // clearInterval(intervalRef.current);
  }


  useEffect(() => { //every time the color value changes, use effect gets called
    document.body.style.backgroundColor = color
    if (timeLeft === 0) {
      stopTimer();
    } 
  });

  return (
    <div>
      <div>

        <h2>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</h2>
      </div>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={skipTimer}>Skip Timer</button>

        <button onClick={
          () => {click=("green")}
        }>Change color</button>

      </div>
    </div>
  );
}

export default PomodoroTimer;
