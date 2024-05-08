import { useState } from "react";
import style from "../styles/matching.module.css";
import QuizQuestions from "./QuizQuestions";

const QuizStart = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleShowQuizz = () => {
    setShowQuiz((val) => !val);
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
