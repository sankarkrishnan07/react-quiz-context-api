import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function Timer() {
  const { secsRemaining, dispatch } = useQuiz();

  const mins = Math.floor(secsRemaining / 60);
  const secs = secsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [secsRemaining, dispatch]
  );
  return (
    <div className="timer">
      ⏲️ {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}
