import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/result.module.css";
import { useEffect, useState } from "react";
import ResultPageCard from "../components/ResultPageCard";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const { resultMatching, setResultMatching, plants } = usePlantsContext();
  const [randomPlants, setRandomPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const navigate = useNavigate();

  const filterPlants = () => {
    const filtArray = [];
    plants.map((plant) => {
      let matchingCount = 0;

      // überprüfung Datentypen
      const cycleIsString = typeof plant.cycle === "string";
      const wateringIsString = typeof plant.watering === "string";
      const sunlightIsArray = Array.isArray(plant.sunlight);
      const edibleIsBoolean = typeof plant.edible === "boolean";
      const poisonousIsBoolean = typeof plant.poisonous === "boolean";

      // Überprüfung Übereinstimmung Eigenschaften
      if (cycleIsString && resultMatching[0].includes(plant.cycle)) {
        matchingCount++;
      }
      if (wateringIsString && resultMatching.includes(plant.watering)) {
        matchingCount++;
      }
      if (
        sunlightIsArray &&
        resultMatching.some((item) => item.includes(plant.sunlight.join(",")))
      ) {
        matchingCount++;
      }
      if (edibleIsBoolean && resultMatching.includes(plant.edible.toString())) {
        matchingCount++;
      }
      if (
        poisonousIsBoolean &&
        resultMatching.includes(plant.poisonous.toString())
      ) {
        matchingCount++;
      }

      if (matchingCount >= 4) {
        filtArray.push(plant);
      }
    });

    setFilteredPlants(filtArray);
  };

  useEffect(() => {
    if (plants) {
      filterPlants();
    }
  }, [plants]);

  const handleNewRandomPlant = () => {
    const ar = [];
    for (let i = 0; i < 3; i++) {
      const plantsIndex = Math.floor(Math.random() * filteredPlants.length);
      ar.push(plantsIndex);
    }
    setRandomPlants(() =>
      filteredPlants.filter((x, index) => ar.includes(index))
    );
  };

  useEffect(() => {
    handleNewRandomPlant();
  }, [filteredPlants]);

  const goToMatching = () => {
    navigate(`/matching`);
  };

  return (
    <div className={style.main}>
      <h2>One of these could become your new plant friend:</h2>
      <div className={style.container}>
        {randomPlants.length > 0 && (
          <ul className={style.cardsContainer}>
            {randomPlants.map((plant) => (
              <ResultPageCard key={plant.id} plant={plant} />
            ))}
          </ul>
        )}

        {!randomPlants.length > 0 ? (
          <button onClick={goToMatching}>match again</button>
        ) : (
          <button onClick={handleNewRandomPlant}>
            finde me another plant friend
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
