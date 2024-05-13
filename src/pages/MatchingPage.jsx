import style from "../styles/matching.module.css";
import QuizStart from "../components/QuizStart";

const MatchingPage = () => {
  return (
    <div className={style.container}>
      <div className={style.main}>
        <QuizStart />
      </div>
    </div>
  );
};

export default MatchingPage;
