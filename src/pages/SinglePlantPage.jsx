import { useNavigate, useParams } from "react-router-dom";
import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/singlePlant.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCircleArrowRight,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const SinglePlantPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { plants } = usePlantsContext();

  // das hier wenn dann in useEffect nutzen (falls es nötig wird):
  //   const initializeCount = () => {
  //     dispatch({ type: "set", value: 1 });
  //   };
  //   initializeCount();

  const currentIndex = plants.findIndex((plant) => plant.id.toString() === id);

  const goToPrev = () => {
    navigate(`/plant/${plants[currentIndex - 1].id}`);
  };

  const goToNext = () => {
    navigate(`/plant/${plants[currentIndex + 1].id}`);
  };

  return (
    <div className={style.main}>
      {plants &&
        plants.length > 0 &&
        plants
          .filter((plant) => plant.id.toString() === id)
          .map((plant) => (
            <div key={plant.id} className={style.container}>
              {plant.default_image && plant.default_image.original_url ? (
                <img
                  className={style.img}
                  src={plant.default_image.original_url}
                  alt={plant.common_name}
                />
              ) : (
                <div className={style.imgReplacement}>No image available</div>
              )}

              <div className={style.middleSec}>
                <FontAwesomeIcon
                  className={
                    currentIndex === 0 ? style.switchDisabled : style.switch
                  }
                  icon={faCircleArrowLeft}
                  onClick={goToPrev}
                />
                <div className={style.card}>
                  <p className={style.location}>
                    <FontAwesomeIcon icon={faLocationDot} />
                    {" " + plant.locations.join(", ")}
                  </p>

                  <h2>{plant.firstName}</h2>
                  <h3>{plant.common_name}</h3>
                  <div className={style.infoDiv}>
                    <div className={style.infos}>
                      <h5>{`Botanical name${
                        plant.scientific_name.length > 1 ? "s" : ""
                      }: `}</h5>
                      <p>{plant.scientific_name.join(", ")}</p>
                    </div>
                    <div className={style.infos}>
                      <h5>This plant needs:</h5>
                      <p>Watering: {plant.watering} watering</p>
                      <p>Sunlight: {plant.sunlight.join(" / ")}</p>
                    </div>
                  </div>
                  <button>Get in touch</button>
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className={
                    currentIndex === plants.length - 1
                      ? style.switchDisabled
                      : style.switch
                  }
                  onClick={goToNext}
                />
              </div>

              <button
                onClick={() => {
                  navigate("/swap");
                }}
              >
                Go back
              </button>
            </div>
          ))}
    </div>
  );
};

export default SinglePlantPage;
