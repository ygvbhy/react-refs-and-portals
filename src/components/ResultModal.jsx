// forwardRef : 부모 컴포넌트에 ref 를 넘겨 줄 수 있음
// useImperativeHandle :  ref로 노출되는 핸들을 사용자가 직접 정의할 수 있게 해주는 React 훅입니다.
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(({ remainigTime, targetTime, onReset }, ref) => {
  const dialog = useRef();

  const userLost = remainigTime <= 0;
  const formattedRemainingTime = (remainigTime / 1000).toFixed(2);
  const score = Math.round((1 - remainigTime / (targetTime * 1000)) * 100);

  // 부모 컴포넌트의 ref 에 해당 함수를 넘겨줌
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>Your lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} secondx left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
