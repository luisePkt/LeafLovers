import React, { useEffect } from "react";
import style from "../styles/result.module.css";
import { useNavigate } from "react-router-dom";
import { usePlantsContext } from "../utils/PlantsProvider";
// icons:
import DropletSolid from "../assets/icons/droplet-solid.svg";
import Cloud from "../assets/icons/cloud-solid.svg";
import Sun from "../assets/icons/sun-solid.svg";
import CloudSun from "../assets/icons/cloud-sun-solid .svg";
import SkullCrossbones from "../assets/icons/skull-crossbones-solid.svg";
import Utensils from "../assets/icons/utensils-solid.svg";

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
          Watering: <DropletSolid className={style.droplet} />{" "}
          {plant.watering === "Average" && (
            <DropletSolid className={style.droplet} />
          )}{" "}
          {plant.watering === "Frequent" && (
            <DropletSolid className={style.droplet} />
          )}{" "}
          {plant.watering === "Frequent" && (
            <DropletSolid className={style.droplet} />
          )}
        </p>
        <p>
          Sunlight:{" "}
          {plant.sunlight.includes("full shade") && (
            <Cloud className={style.cloud} />
          )}{" "}
          {plant.sunlight.includes("deep shade") && (
            <Cloud className={style.cloud} />
          )}{" "}
          {plant.sunlight.includes("full sun") && <Sun className={style.sun} />}{" "}
          {plant.sunlight.join("").includes("part") && (
            <CloudSun className={style.cloudSun} />
          )}
        </p>
        <p>
          Poisonous:{" "}
          {plant.poisonous.toString().includes(true) && (
            <SkullCrossbones className={style.skull} />
          )}
          {plant.poisonous.toString().includes(false) && "not"}
        </p>
        <p>
          Edible:{" "}
          {plant.poisonous.toString().includes(true) && (
            <Utensils className={style.utensils} />
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
