import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/swap.module.css";
import SinglePlant from "./SinglePlantOverview";
import { useEffect } from "react";

const SwapGallery = () => {
  const {
    plants,
    count,
    dispatch,
    plantSelection,
    setPlantSelection,
    searchInput,
    locationFilter,
    wateringFilter,
    sunlightFilter,
  } = usePlantsContext();

  // const initializeCount = () => {
  //   if (count < 10) {
  //     dispatch({ type: "set", value: 10 });
  //   }
  // };

  useEffect(() => {
    setPlantSelection(plants);
  }, []);

  useEffect(() => {
    setPlantSelection(
      plants.filter((plant) => {
        let locationCheck =
          locationFilter === "all" || plant.locations.includes(locationFilter);
        let searchCheck = plant.common_name
          .toLowerCase()
          .includes(searchInput.toLowerCase());
        let wateringCheck =
          wateringFilter === "all" || wateringFilter === plant.watering;
        let sunlightCheck =
          sunlightFilter === "all" ||
          plant.sunlight.some((string) => string.includes(sunlightFilter));
        console.log("filter: ", sunlightFilter);
        console.log("Check: " + sunlightCheck);
        console.log("plant.sunlight:", plant.sunlight);
        console.log(`\n`);
        return locationCheck && searchCheck && wateringCheck && sunlightCheck;
      })
    );
    dispatch({ type: "set", value: "10" });
  }, [searchInput, plants, locationFilter, wateringFilter, sunlightFilter]);

  return (
    <div className={style.container}>
      {/* Singleplant Cards */}
      {plantSelection && plantSelection.length > 0 && (
        <ul className={style.cardsContainer}>
          {plantSelection.slice(0, count).map((plant) => (
            <SinglePlant key={plant.id} plant={plant} />
          ))}
        </ul>
      )}{" "}
    </div>
  );
};

export default SwapGallery;
