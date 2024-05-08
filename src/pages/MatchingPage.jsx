import style from "../styles/matching.module.css";
import QuizStart from "../components/QuizStart";
import { Outlet } from "react-router-dom";

const MatchingPage = () => {
  return (
    <div className={style.main}>
      <QuizStart />
    </div>
  );
};

export default MatchingPage;
