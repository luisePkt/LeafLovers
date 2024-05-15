import React, { useEffect } from "react";
import style from "../styles/result.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faSkullCrossbones,
  faUtensils,
  faCloud,
  faSun,
  faCloudSun,
  faHeart as faSolidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { usePlantsContext } from "../utils/PlantsProvider";

const ResultPageCard = ({ plant }) => {
  const { setNavigateBack } = usePlantsContext();
  const navigate = useNavigate();

  // go to SinglePlantCard
  const goToPlant = () => {
    navigate(`/plant/${plant.id}`);
  };

  // go back to results
  useEffect(() => {
    setNavigateBack ? setNavigateBack("/result") : null;
  }, [setNavigateBack]);

  return plant ? (
    <div className={style.card}>
      <h3 className={style.headline}>{plant.common_name}</h3>
      {plant.default_image ? (
        <div className={style.img}>
          {" "}
          <img
            className={style.img}
            src={plant.default_image.small_url || plant.default_original_url}
            alt="plant image"
          />{" "}
        </div>
      ) : (
        <div className={style.imgReplacement}>
          <p>No image available</p>
        </div>
      )}
      <div className={style.infos}>
        <h5>This plant needs: </h5>
        <p>
          Watering: <FontAwesomeIcon icon={faDroplet} />{" "}
          {plant.watering === "Average" && <FontAwesomeIcon icon={faDroplet} />}{" "}
          {plant.watering === "Frequent" && (
            <FontAwesomeIcon icon={faDroplet} />
          )}{" "}
          {plant.watering === "Frequent" && (
            <FontAwesomeIcon icon={faDroplet} />
          )}
        </p>
        <p>
          Sunlight:{" "}
          {plant.sunlight.includes("full shade") && (
            <FontAwesomeIcon icon={faCloud} />
          )}{" "}
          {plant.sunlight.includes("deep shade") && (
            <FontAwesomeIcon icon={faCloud} />
          )}{" "}
          {plant.sunlight.includes("full sun") && (
            <FontAwesomeIcon icon={faSun} />
          )}{" "}
          {plant.sunlight.join("").includes("part") && (
            <FontAwesomeIcon icon={faCloudSun} />
          )}
        </p>
        <p>
          Poisonous:{" "}
          {plant.poisonous.toString().includes(true) && (
            <FontAwesomeIcon icon={faSkullCrossbones} />
          )}
          {plant.poisonous.toString().includes(false) && "not"}
        </p>
        <p>
          Edible:{" "}
          {plant.poisonous.toString().includes(true) && (
            <FontAwesomeIcon icon={faUtensils} />
          )}
          {plant.poisonous.toString().includes(false) && "not"}
        </p>
      </div>
      <button onClick={goToPlant}>adopt me</button>
    </div>
  ) : (
    <div>no plant available</div>
  );
};

export default ResultPageCard;
