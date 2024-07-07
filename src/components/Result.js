import { useQuiz } from "../contexts/QuizContext";
import Button from "./Button";

export default function Result({ msg }) {
  const { questions, points, highScore, dispatch, secsRemaining } = useQuiz();

  const totalPoints = questions?.reduce(
    (acc, question) => acc + question.points,
    0
  );

  return (
    <div className="app-result__wrap">
      <p className="app-result__info">{`${
        secsRemaining === -1 ? "TIME OUT!" : ""
      } Thank you for taking the assessment`}</p>
      <p className="app-result">
        You socred {points} out of {totalPoints} (
        {((points / totalPoints) * 100).toFixed(0)}%)
      </p>
      <p className="app-result__highscore">(Highscore: {highScore} points)</p>
      <Button handleClick={() => dispatch({ type: "restart" })}>
        Start Over
      </Button>
    </div>
  );
}
