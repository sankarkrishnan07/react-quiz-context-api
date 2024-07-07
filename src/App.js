import Header from "./components/Header";
import Main from "./components/Main";
import Welcome from "./components/Welcome";
import Error from "./components/Error";
import Loader from "./components/Loader";
import Question from "./components/Question";
import Button from "./components/Button";
import MainFooter from "./components/MainFooter";
import MainHeader from "./components/MainHeader";
import Result from "./components/Result";
import Timer from "./components/Timer";
import { useQuiz } from "./contexts/QuizContext";

function App() {
  const { status, questions, answer, dispatch, index } = useQuiz();

  const noq = questions?.length;

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Welcome />}
        {status === "start" && (
          <>
            <MainHeader />
            <Question />
            <MainFooter>
              <Timer />
              {answer !== null && (
                <Button
                  handleClick={() =>
                    dispatch({
                      type: index === noq - 1 ? "completed" : "nextQuestion",
                    })
                  }
                  style={`app-main__footer-btn`}
                >
                  {index === noq - 1 ? "Finish" : "Next"}
                </Button>
              )}
            </MainFooter>
          </>
        )}
        {status === "completed" && <Result />}
      </Main>
    </div>
  );
}

export default App;
