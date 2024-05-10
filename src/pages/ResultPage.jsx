import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/result.module.css";
import { useEffect, useState } from "react";

const ResultPage = () => {
  // connection provider:
  const { resultMatching, setResultMatching, plants } = usePlantsContext();

  const [randomPlant, setRandomPlant] = useState(null);

  console.log(resultMatching);
  // console.log(typeof resultMatching); // object

  const filterPlants = (plants, resultMatching) => {
    return plants.filter((plant) => {
      let matchingCount = 0;

      // alles in Kleinbuchstaben wegen key-sensitivity
      const uppercasedResultMatching = resultMatching.map((value) =>
        value.toLowerCase()
      );

      // Überprüfen, ob die Eigenschaften existieren und Strings sind
      const cycleIsString = typeof plant.cycle === "string";
      const wateringIsString = typeof plant.watering === "string";
      // sunlight ist kein string, deshalb:
      const sunlightIsString = typeof plant.sunlight === "string";

      // Überprüfen, ob mindestens eine der Eigenschaften in resultMatching ist
      if (
        (plant.cycle &&
          uppercasedResultMatching.includes(plant.cycle.toLowerCase())) ||
        (wateringIsString &&
          uppercasedResultMatching.includes(plant.watering.toLowerCase())) ||
        (sunlightIsString &&
          uppercasedResultMatching.includes(plant.sunlight.toLowerCase()))
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

  // ein Pflanzenobjekt per Zufall auswählen:

  const randomSelectedPlant = () => {
    const yourPlantIndex = Math.floor(Math.random() * filteredPlants.length);
    setRandomPlant(filteredPlants[yourPlantIndex]);
  };

  console.log(randomPlant);

  return (
    <div className={style.main}>
      <div className={style.card}>
        <h3>This could be your new plant friend</h3>
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

        {/* <button onClick={selectPlant}>finde me another plant friend</button> */}
      </div>
    </div>
  );
};

export default ResultPage;
