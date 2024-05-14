// import { useNavigate, useParams } from "react-router-dom";
import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/result.module.css";
import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faDroplet,
//   faCloud,
//   faSun,
//   faCloudSun,
//   faHeart as faSolidHeart,
// } from "@fortawesome/free-solid-svg-icons";
import ResultPageCard from "../components/ResultPageCard";

const ResultPage = () => {
  // connection provider:
  const { resultMatching, setResultMatching, plants } = usePlantsContext();
  // set random plant:
  const [randomPlant, setRandomPlant] = useState(null);

  console.log(resultMatching);
  // console.log(typeof resultMatching); // object

  const filterPlants = (plants, resultMatching) => {
    return plants.filter((plant) => {
      let matchingCount = 0;

      // Überprüfen, ob die Eigenschaften existieren und Strings sind
      const cycleIsString = typeof plant.cycle === "string";
      const wateringIsString = typeof plant.watering === "string";
      // sunlight ist kein string, sondern ein array, deshalb:
      const sunlightIsArray = Array.isArray(plant.sunlight);
      const edibleToString = typeof plant.edible === "string";
      const poisonousToString = typeof plant.poisonous === "string";

      // test:
      // if (
      //   typeof plant.cycle === "string" &&
      //   resultMatching.some((item) => item.includes(plant.sunlight))
      // ) {
      //   console.log("Bedingung erfüllt");
      // } else {
      //   console.log("Bedingung nicht erfüllt");
      // }
      ////////////////

      // Überprüfen, ob mindestens eine der Eigenschaften in resultMatching ist
      if (
        (cycleIsString && resultMatching.includes(plant.cycle)) ||
        (wateringIsString && resultMatching.includes(plant.watering)) ||
        (sunlightIsArray &&
          resultMatching.some((item) => item.includes(plant.sunlight))) ||
        (edibleToString && resultMatching.includes(plant.edible)) ||
        (poisonousToString && resultMatching.includes(plant.poisonous))
      ) {
        matchingCount++;
      }

      // gibt an, ab welcher Anzahl an Übereinstimmungen Planze zu array hinzugefügt werden soll
      return matchingCount >= 1;
    });
  };
  // console.log("Plants:", plants);
  // console.log("Result Matching:", resultMatching);
  // console.log(filterPlants(plants, resultMatching));
  const filteredPlants = filterPlants(plants, resultMatching);
  console.log(filteredPlants);

  // funktion button zur auswahl einer anderen pflanze:
  // EIN Pflanzenobjekt per Zufall auswählen:
  // const handleNewRandomPlant = () => {
  //   const yourPlantIndex = Math.floor(Math.random() * filteredPlants.length);
  //   setRandomPlant(filteredPlants[yourPlantIndex]);
  // };

  // MEHRERE Pflanzenobjecte per Zufall auswählen:
  // drei Indices erhalten
  const getRandomIndices = () => {
    const randomPlantArrayIndex = [];
    while (randomPlantArrayIndex.length < 3) {
      const plantsIndex = Math.floor(Math.random() * filteredPlants.length);
      if (!randomPlantArrayIndex.includes(plantsIndex)) {
        randomPlantArrayIndex.push(plantsIndex);
      }
    }
    return randomPlantArrayIndex;
  };

  // mit Indices Pflanzen auswählen
  const handleNewRandomPlant = () => {
    const indices = getRandomIndices(filteredPlants);
    const selectedRandomPlants = indices.map((index) => filteredPlants[index]);
    setRandomPlant(selectedRandomPlants);
  };

  useEffect(() => {
    handleNewRandomPlant();
  }, []);
  console.log(randomPlant);

  return (
    <div className={style.main}>
      <div className={style.container}>
        {/* <h2>This could be your new plant friend:</h2> */}
        <h2>One of these three could become your new plant friend:</h2>
        {/* Eigenschaften aus Quiz */}
        {/* {
          <div>
            <ul>
              {resultMatching.map((criteria, index) => (
                <li key={index}>{criteria.toString()}</li>
              ))}
            </ul>
          </div>
        } */}

        {/* <div> */}
        {/* {randomPlant && randomPlant.default_image ? (
            <img
              src={
                randomPlant.default_image.small_url ||
                randomPlant.default_original_url
              }
              alt="plant image"
            />
          ) : (
            <div className={style.imgReplacement}>
              <p>No image available</p>
            </div>
          )} */}

        {/* <div className={style.middleSec}> */}
        {randomPlant && (
          <ul className={style.cardsContainer}>
            {randomPlant.map((plant) => (
              <ResultPageCard key={plant.id} plant={plant} />
            ))}
          </ul>
        )}
        {/* {randomPlant && (
              <div className={style.card}>
                <h2>{randomPlant.common_name}</h2>
                <div className={style.infos}>
                  <h5>{`Botanical name ${
                    randomPlant.scientific_name.length > 1 ? "s" : ""
                  }: `}</h5>
                  <p>{randomPlant.scientific_name.join(", ")}</p>
                </div>
                <div className={style.infos}>
                  <h5>This plant needs:</h5>
                  <p>
                    Watering: {randomPlant.watering} watering{" "}
                    <FontAwesomeIcon icon={faDroplet} />{" "}
                    {randomPlant.watering === "Average" && (
                      <FontAwesomeIcon icon={faDroplet} />
                    )}{" "}
                    {randomPlant.watering === "Frequent" && (
                      <FontAwesomeIcon icon={faDroplet} />
                    )}{" "}
                    {randomPlant.watering === "Frequent" && (
                      <FontAwesomeIcon icon={faDroplet} />
                    )}
                  </p>
                  <p>
                    Sunlight: {randomPlant.sunlight.join(", ")}{" "}
                    {randomPlant.sunlight.includes("full shade") && (
                      <FontAwesomeIcon icon={faCloud} />
                    )}{" "}
                    {randomPlant.sunlight.includes("deep shade") && (
                      <FontAwesomeIcon icon={faCloud} />
                    )}{" "}
                    {randomPlant.sunlight.includes("full sun") && (
                      <FontAwesomeIcon icon={faSun} />
                    )}{" "}
                    {randomPlant.sunlight.join("").includes("part") && (
                      <FontAwesomeIcon icon={faCloudSun} />
                    )}
                  </p>
                </div>
              </div>
            )} */}
        {/* </div> */}
        {/* </div> */}

        <button onClick={handleNewRandomPlant}>
          finde me another plant friend
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
