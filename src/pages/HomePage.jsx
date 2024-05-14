import { Link, useNavigate } from "react-router-dom";
import QuizStart from "../components/QuizStart";
import style from "../styles/home.module.css";
import ResultPageCard from "../components/ResultPageCard";
import { usePlantsContext } from "../utils/PlantsProvider";
import { useEffect } from "react";

const HomePage = () => {
  const { plants, randomIds, setNavigateBack } = usePlantsContext();

  const navigate = useNavigate();

  useEffect(() => {
    setNavigateBack ? setNavigateBack("/") : null;
  }, [setNavigateBack]);

  return (
    <div className={style.main}>
      <h1>Welcome</h1>
      <QuizStart />

      <h2>Or directly find a plant in our Swap Exchange</h2>
      {randomIds && plants && (
        <section className={style.previewContainer}>
          <Link className={style.link} to={`/plant/${randomIds[0]}`}>
            <ResultPageCard plant={plants[randomIds[0] - 1]} />
          </Link>
          <Link className={style.link} to={`/plant/${randomIds[1]}`}>
            <ResultPageCard plant={plants[randomIds[1] - 1]} />
          </Link>
          <Link className={style.link} to={`/plant/${randomIds[2]}`}>
            <ResultPageCard plant={plants[randomIds[2] - 1]} />
          </Link>{" "}
        </section>
      )}
      <button onClick={() => navigate("/swap")}>Go to Swap Exchange</button>
    </div>
  );
};

export default HomePage;
