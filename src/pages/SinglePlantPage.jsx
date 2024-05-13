import { useNavigate, useParams } from "react-router-dom";
import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/singlePlant.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCircleArrowRight,
  faCircleArrowLeft,
  faDroplet,
  faCloud,
  faSun,
  faCloudSun,
  faHeart as faSolidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";

const SinglePlantPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showContact, setShowContact] = useState(false);
  const {
    plants,
    favorites,
    setFavorites,
    currentPlant,
    setCurrentPlant,
    currentIndex,
    setCurrentIndex,
  } = usePlantsContext();

  // das hier wenn dann in useEffect nutzen (falls es nötig wird):
  //   const initializeCount = () => {
  //     dispatch({ type: "set", value: 1 });
  //   };
  //   initializeCount();

  useEffect(() => {
    setCurrentPlant(plants.filter((plant) => plant.id.toString() === id)[0]);
    setCurrentIndex(plants.findIndex((plant) => plant.id.toString() === id));
  }, [plants, id]);

  useEffect(() => {
    setShowContact(false);
  }, [currentPlant]);

  const goToPrev = () => {
    navigate(`/plant/${plants[currentIndex - 1].id}`);
  };

  const goToNext = () => {
    navigate(`/plant/${plants[currentIndex + 1].id}`);
  };

  const toggleFavorites = () => {
    if (favorites.includes(currentPlant)) {
      setFavorites(favorites.filter((p) => p.id !== currentPlant.id));
    } else {
      setFavorites([...favorites, currentPlant]);
    }
  };

  const toggleContact = () => {
    setShowContact(!showContact);
  };

  return currentPlant && currentPlant.scientific_name ? (
    <div className={style.main}>
      {currentPlant && currentPlant.scientific_name && (
        <div key={currentPlant.id} className={style.container}>
          {currentPlant.default_image &&
          currentPlant.default_image.original_url ? (
            <img
              className={style.img}
              src={currentPlant.default_image.original_url}
              alt={currentPlant.common_name}
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
                <FontAwesomeIcon
                  icon={
                    favorites.includes(currentPlant)
                      ? faSolidHeart
                      : faRegularHeart
                  }
                  className={style.heart}
                  onClick={toggleFavorites}
                />
                <FontAwesomeIcon icon={faLocationDot} />
                {" " + currentPlant.locations.join(", ")}
              </p>

              <h2>{currentPlant.firstName}</h2>
              <h3>{currentPlant.common_name}</h3>
              <div className={style.infoDiv}>
                <div className={style.infos}>
                  <h5>{`Botanical name${
                    currentPlant.scientific_name.length > 1 ? "s" : ""
                  }: `}</h5>
                  <p>{currentPlant.scientific_name.join(", ")}</p>
                </div>
                <div className={style.infos}>
                  <h5>This plant needs:</h5>
                  <p>
                    Watering: {currentPlant.watering} watering{" "}
                    <FontAwesomeIcon icon={faDroplet} />{" "}
                    {currentPlant.watering === "Average" && (
                      <FontAwesomeIcon icon={faDroplet} />
                    )}{" "}
                    {currentPlant.watering === "Frequent" && (
                      <FontAwesomeIcon icon={faDroplet} />
                    )}{" "}
                    {currentPlant.watering === "Frequent" && (
                      <FontAwesomeIcon icon={faDroplet} />
                    )}
                  </p>
                  <p>
                    Sunlight: {currentPlant.sunlight.join(", ")}{" "}
                    {currentPlant.sunlight.includes("full shade") && (
                      <FontAwesomeIcon icon={faCloud} />
                    )}{" "}
                    {currentPlant.sunlight.includes("deep shade") && (
                      <FontAwesomeIcon icon={faCloud} />
                    )}{" "}
                    {currentPlant.sunlight.includes("full sun") && (
                      <FontAwesomeIcon icon={faSun} />
                    )}{" "}
                    {currentPlant.sunlight.join("").includes("part") && (
                      <FontAwesomeIcon icon={faCloudSun} />
                    )}
                  </p>
                </div>
              </div>
              {!showContact && (
                <button onClick={toggleContact}>Get in touch</button>
              )}
              {showContact && <p>Contactbox here</p>}
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
              navigate(-1);
            }}
          >
            Go back
          </button>
        </div>
      )}
    </div>
  ) : (
    <ErrorPage />
  );
};

export default SinglePlantPage;
