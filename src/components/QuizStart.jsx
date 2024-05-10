import { useState } from "react";
import style from "../styles/matching.module.css";
import QuizQuestions from "./QuizQuestions";
import { usePlantsContext } from "../utils/PlantsProvider";

const QuizStart = () => {
  // connection provider to save answer criteria:
  const { resultMatching, setResultMatching } = usePlantsContext();

  const [showQuiz, setShowQuiz] = useState(false);

  // Zurücksetzten der Werte im resultMatching array:
  // const resetArrayResult = () => {
  //   setResultMatching([]);
  // };

  const handleShowQuizz = () => {
    setShowQuiz((val) => !val);

    // Zurücksetzten der Werte im resultMatching array:
    setResultMatching([]);
  };

  return (
    <div className={style.main}>
      <p>Would you like to find out which plant suits you?</p>

      {/* start button */}
      <button className={style.startBtn} onClick={handleShowQuizz}>
        {showQuiz ? "quit quiz" : "press me to find out"}
      </button>

      {/* quiz */}
      {showQuiz && <QuizQuestions />}
    </div>
  );
};

export default QuizStart;
