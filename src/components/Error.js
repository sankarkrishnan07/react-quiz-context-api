import { useQuiz } from "../contexts/QuizContext";

export default function Error() {

  const {errorMsg} = useQuiz();

  return <p className="error">⚠️ {errorMsg}</p>;
}
