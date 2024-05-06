import QuizStart from "../components/QuizStart";
import style from "../styles/home.module.css";

const HomePage = () => {
  return (
    <div className={style.main}>
      <h1>Welcome</h1>
      <QuizStart />
      <button>
        ...or meet other plants on our <span>Swap Meet</span>
      </button>
    </div>
  );
};

export default HomePage;
