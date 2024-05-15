import style from "../styles/matching.module.css";
import QuizStart from "../components/QuizStart";

const MatchingPage = () => {
  return (
    <div className={style.container}>
      <h2>Find your match</h2>
      <div className={style.section}>
        <QuizStart />
      </div>
    </div>
  );
};

export default MatchingPage;
