import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  status: "loading",
  errorMsg: null,
  questions: null,
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "error":
      return { ...state, status: "error", errorMsg: action.payload };
    case "ready":
      return { ...state, status: "ready", questions: action.payload };
    case "start":
      return {
        ...state,
        status: "start",
        secsRemaining: SECS_PER_QUESTION * state.questions.length,
      };
    case "tick":
      return {
        ...state,
        secsRemaining: state.secsRemaining - 1,
        status: state.secsRemaining === 0 ? "completed" : state.status,
      };
    case "newAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
        highScore:
          state.points + question.points > state.highScore
            ? state.points + question.points
            : state.highScore,
      };
    case "nextQuestion":
      if (state.index >= state.questions.length) return state;
      return { ...state, index: state.index + 1, answer: null };
    case "completed":
      return {
        ...state,
        status: "completed",
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function QuizProvider({ children }) {
  const [
    {
      status,
      errorMsg,
      questions,
      index,
      answer,
      points,
      highScore,
      secsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok)
          return dispatch({
            type: "error",
            payload:
              "Error occured in fetching the questions, please try again after sometime.",
          });
        const data = await res.json();
        if (data === null || data.length === 0)
          return dispatch({
            type: "error",
            payload: "No data found",
          });

        dispatch({ type: "ready", payload: data.questions });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    }

    fetchData();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        errorMsg,
        questions,
        index,
        answer,
        points,
        highScore,
        secsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Context accessed outside provider");
  return context;
}

export { QuizProvider, useQuiz };
