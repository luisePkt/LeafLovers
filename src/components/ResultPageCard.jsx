import React, { useEffect } from "react";
import style from "../styles/result.module.css";
import { useNavigate } from "react-router-dom";
import { usePlantsContext } from "../utils/PlantsProvider";
// icons:
import Droplet from "./icons/Droplet";
import { Sun } from "./icons/Sun";
import Cloud from "./icons/Cloud";
import CloudSun from "./icons/CloudSun";
import SkullCrossbones from "./icons/SkullCrossbones";
import Utensils from "./icons/Utensils";

const ResultPageCard = ({ plant }) => {
  const { setNavigateBack, consent } = usePlantsContext();
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
      {plant.default_image && consent ? (
        <div className={style.imgContainer}>
          {" "}
          <img
            className={style.img}
            src={plant.default_image.small_url || plant.default_original_url}
            alt={`${plant.common_name}, image source: pixabay.com`}
          />{" "}
          <p className={style.imageSource}>
            Source:{" "}
            <a href="https://pixabay.com" target="_blank">
              pixabay
            </a>
          </p>
        </div>
      ) : !consent ? (
        <div className={style.imgReplacement}>Image requires cookies</div>
      ) : (
        <div className={style.imgReplacement}>
          <p>No image available</p>
        </div>
      )}
      <div className={style.infos}>
        <h5>This plant needs:</h5>

        <p>
          Watering: <Droplet /> {plant.watering === "Average" && <Droplet />}{" "}
          {plant.watering === "Frequent" && <Droplet />}{" "}
          {plant.watering === "Frequent" && <Droplet />}
        </p>
        <p>
          Sunlight: {plant.sunlight.includes("full shade") && <Cloud />}{" "}
          {plant.sunlight.includes("deep shade") && <Cloud />}{" "}
          {plant.sunlight.includes("full sun") && <Sun />}{" "}
          {plant.sunlight.join("").includes("part") && <CloudSun />}
        </p>
        <p>
          Poisonous:{" "}
          {plant.poisonous.toString().includes(true) && <SkullCrossbones />}
          {plant.poisonous.toString().includes(false) && "not"}
        </p>
        <p>
          Edible: {plant.poisonous.toString().includes(true) && <Utensils />}
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
