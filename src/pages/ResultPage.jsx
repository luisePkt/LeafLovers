import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/result.module.css";
import { useEffect, useState } from "react";
import ResultPageCard from "../components/ResultPageCard";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const {
    resultMatching,
    setResultMatching,
    plants,
    // navigateBackToResult,
    // setNavigateBackToResult,
    // idsResult,
    // setIdsResult,
  } = usePlantsContext();
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
    // The Fisher Yates Method:
    const copyFilteredPlants = [...filteredPlants];
    // i ist quasi letzter index (element) des arrays und schleife läuft so lange, wie es elmente gibt
    for (let i = copyFilteredPlants.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [copyFilteredPlants[i], copyFilteredPlants[j]] = [
        copyFilteredPlants[j],
        copyFilteredPlants[i],
      ];
    }
    const arrayIndices = copyFilteredPlants.slice(0, 3);

    setRandomPlants(arrayIndices);
  };

  useEffect(() => {
    handleNewRandomPlant();
  }, [filteredPlants]);

  const goToMatching = () => {
    navigate(`/matching`);
  };

  // useEffect(() => {
  //   setNavigateBackToResult ? setNavigateBackToResult("/result") : null;
  // }, [setNavigateBackToResult]);

  // useEffect(() => {
  //   setIdsResult([
  // randomPlants[0].id.toString(),
  // randomPlants[1].id.toString(),
  // randomPlants[2].id.toString(),
  //   ]);
  // }, [randomPlants]);
  // console.log("idsResult", idsResult);
  // console.log("randomPlants", randomPlants[0].id.toString());

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
