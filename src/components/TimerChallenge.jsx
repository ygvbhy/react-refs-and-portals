import React, { useRef, useState } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
  // 대충 선언 한뒤 setTimerout 없애려고 하면 state 로 인해 값이 초기화 됨
  // 그래서 참조 값으로 따로 선언 해서 진행 해야 함
  const timer = useRef();

  const [timerExpired, setTimerExpired] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  const handleStart = () => {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, targetTime * 1000);

    setTimerStarted(true);
  };

  const handleStop = () => {
    clearTimeout(timer.current);
  };

  return (
    <>
      {timerExpired && <ResultModal targetTime={targetTime} result="lost" />}
      <div className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} seconds{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : ""}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p>
      </div>
    </>
  );
};

export default TimerChallenge;
