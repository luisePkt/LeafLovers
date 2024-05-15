import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/singlePlant.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorPage from "./ErrorPage";
import Contact from "../components/Contact";
import AnimatedRight from "../components/AnimatedRight";
import AnimatedLeft from "../components/AnimatedLeft";

import {
  faLocationDot,
  faCircleArrowRight,
  faCircleArrowLeft,
  faDroplet,
  faCloud,
  faSun,
  faCloudSun,
  faHeart as faSolidHeart,
  faSkullCrossbones,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

const SinglePlantPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showContact, setShowContact] = useState(false);
  const [showThankyou, setShowThankyou] = useState(false);
  const {
    plants,
    favorites,
    setFavorites,
    currentPlant,
    setCurrentPlant,
    currentIndex,
    setCurrentIndex,
    navigateBack,
  } = usePlantsContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCurrentPlant(plants.filter((plant) => plant.id.toString() === id)[0]);
    setCurrentIndex(plants.findIndex((plant) => plant.id.toString() === id));
  }, [plants, id]);

  useEffect(() => {
    setShowContact(false);
    setShowThankyou(false);
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
          (currentPlant.default_image.small_url ||
            currentPlant.default_image.original_url) ? (
            <img
              className={style.img}
              src={
                currentPlant.default_image.original_url ||
                currentPlant.default_image.small_url
              }
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
              <AnimatedRight>
                <FontAwesomeIcon
                  icon={
                    favorites.includes(currentPlant)
                      ? faSolidHeart
                      : faRegularHeart
                  }
                  className={style.heart}
                  onClick={toggleFavorites}
                />
              </AnimatedRight>
              <p className={style.favInstruction}>
                {favorites.includes(currentPlant)
                  ? "Remove from favorites"
                  : "Add to favorites"}
              </p>
              <h3>{currentPlant.common_name}</h3>
              <div className={style.infoDiv}>
                <div className={style.infos}>
                  <h5>{`Botanical name${
                    currentPlant.scientific_name.length > 1 ? "s" : ""
                  }: `}</h5>
                  <p>{currentPlant.scientific_name.join(", ")}</p>
                </div>
                <div className={style.infos}>
                  <h5>Care-taking details: </h5>
                  <p>
                    Watering: <FontAwesomeIcon icon={faDroplet} />{" "}
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
                    Sunlight:{" "}
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
                  <p>
                    Poisonous:{" "}
                    {currentPlant.poisonous.toString().includes(true) && (
                      <FontAwesomeIcon icon={faSkullCrossbones} />
                    )}
                    {currentPlant.poisonous.toString().includes(false) && "no"}
                  </p>
                  <p>
                    Edible:{" "}
                    {currentPlant.poisonous.toString().includes(true) && (
                      <FontAwesomeIcon icon={faUtensils} />
                    )}
                    {currentPlant.poisonous.toString().includes(false) && "no"}
                  </p>
                </div>
              </div>
              {currentPlant.locations && currentPlant.firstNames && (
                <div className={style.plantDetails}>
                  <h5>This plant is currently available here: </h5>
                  <p className={style.location}></p>
                  {currentPlant.locations.map((x, index) => (
                    <p key={index}>
                      <FontAwesomeIcon icon={faLocationDot} />{" "}
                      {currentPlant.locations[index]}:{" "}
                      <em> {currentPlant.firstNames[index]}</em>
                    </p>
                  ))}
                </div>
              )}
              {showThankyou && (
                <div className={style.thankyouMessage}>
                  <p>Thank you for your message!</p>
                  <p className={style.disclaimer}>
                    This is only a test version of the app. Therefore, your
                    message was not forwarded and no data was stored.
                  </p>
                </div>
              )}
              {!showContact && !showThankyou && (
                <AnimatedLeft>
                  <button onClick={toggleContact}>Get in touch</button>
                </AnimatedLeft>
              )}
              {showContact && (
                <Contact
                  setShowContact={setShowContact}
                  setShowThankyou={setShowThankyou}
                />
              )}
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
          <AnimatedRight>
            <div className={style.buttonSection}>
              {favorites.includes(currentPlant) &&
                navigateBack !== "/favorites" && (
                  <button onClick={() => navigate("/favorites")}>
                    My favorites
                  </button>
                )}
              {navigateBack !== "/adopt" && (
                <button onClick={() => navigate("/adopt")}>
                  Go to Gallery
                </button>
              )}
              <button
                onClick={() => {
                  navigate(navigateBack);
                }}
              >
                Go back
              </button>
            </div>
          </AnimatedRight>
        </div>
      )}
    </div>
  ) : (
    <ErrorPage />
  );
};

export default SinglePlantPage;

// some comment
