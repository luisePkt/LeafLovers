import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/swap.module.css";
import SinglePlant from "./SinglePlant";
import { useEffect } from "react";

const SwapGallery = () => {
  const { plants, count, dispatch } = usePlantsContext();

  const initializeCount = () => {
    if (count < 10) {
      dispatch({ type: "set", value: 10 });
    }
  };

  useEffect(() => {
    initializeCount();
  }, []);

  return (
    <div className={style.container}>
      <label htmlFor="filtering">Filter by </label>
      <select name="filtering" id="filtering">
        <option value="none"></option>
        <option value="location">Location</option>
        <optgroup label="Watering">
          <option value="watering_high">high</option>
          <option value="watering_low">low</option>
        </optgroup>
        <optgroup label="Light">
          <option value="light_high">much</option>
          <option value="light_low">little</option>
        </optgroup>
      </select>
      {plants.length > 0 && (
        <ul className={style.cardsContainer}>
          {plants.slice(0, count).map((plant) => (
            <SinglePlant key={plant.id} plant={plant} />
          ))}
        </ul>
      )}{" "}
    </div>
  );
};

export default SwapGallery;
