import { useQuiz } from "../contexts/QuizContext";
import Progress from "./Progress";

export default function MainHeader() {
  const {index, points, questions} = useQuiz();

  const noq = questions?.length;
  const totalPoints = questions?.reduce(
    (acc, question) => acc + question.points,
    0
  );

  return (
    <div className="app-main__header-wrap">
      <Progress max={noq} value={index+1} />
      <div className="app-main__header">
        <p className="app-main__header-question">
          Question: {index + 1}/{noq}
        </p>
        <p className="app-main__header-points">
          {points}/{totalPoints} points
        </p>
      </div>
    </div>
  );
}
