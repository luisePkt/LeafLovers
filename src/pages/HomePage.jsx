import { useNavigate } from "react-router-dom";
import QuizStart from "../components/QuizStart";
import style from "../styles/home.module.css";
import ResultPageCard from "../components/ResultPageCard";
import { usePlantsContext } from "../utils/PlantsProvider";
import { useEffect } from "react";
import AnimatedLeft from "../components/AnimatedLeft";

const HomePage = () => {
  const { plants, randomIds, setNavigateBack } = usePlantsContext();

  const navigate = useNavigate();

  useEffect(() => {
    setNavigateBack ? setNavigateBack("/") : null;
  }, [setNavigateBack]);

  return (
    <div className={style.main}>
      <h1>LeafLovers</h1>
      <QuizStart />

      <h2>Or adopt a new plant friend directly</h2>
      {randomIds && plants && (
        <section className={style.previewContainer}>
          <ResultPageCard plant={plants[randomIds[0] - 1]} />

          <ResultPageCard plant={plants[randomIds[1] - 1]} />
          <ResultPageCard plant={plants[randomIds[2] - 1]} />
        </section>
      )}
      <AnimatedLeft>
        <button onClick={() => navigate("/adopt")}>Discover more</button>
      </AnimatedLeft>
    </div>
  );
};

export default HomePage;
