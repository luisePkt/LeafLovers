import { useNavigate } from "react-router-dom";
import QuizStart from "../components/QuizStart";
import style from "../styles/home.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className={style.main}>
      <h1>Welcome</h1>
      <QuizStart />
      <button className={style.homeBtn} onClick={() => navigate("/swap")}>
        ...or meet other plants in our <span>Swap Exchange</span>
      </button>
    </div>
  );
};

export default HomePage;
