import React, { useRef, useState } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
  // 대충 선언 한뒤 setTimerout 없애려고 하면 state 로 인해 값이 초기화 됨
  // 그래서 참조 값으로 따로 선언 해서 진행 해야 함
  const timer = useRef();
  const dialog = useRef();
  // const [timerExpired, setTimerExpired] = useState(false);
  // const [timerStarted, setTimerStarted] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    setInterval(timer.current);
    setTimeRemaining(targetTime * 1000);
    dialog.current.open();
  }

  const handleStart = () => {
    timer.current = setInterval(() => {
      // setTimerExpired(true);
      // 자식 컴포넌트에서 받아온 ref 함수
      // dialog.current.open();
      setTimeRemaining((prevTimeRemaing) => prevTimeRemaing - 10);
    }, 10);

    // setTimerStarted(true);
  };

  const handleStop = () => {
    dialog.current.open();
    clearInterval(timer.current);
  };

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} result='lost' />
      <div className='challenge'>
        <h2>{title}</h2>
        <p className='challenge-time'>
          {targetTime} seconds{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : ""}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </div>
    </>
  );
};

export default TimerChallenge;
