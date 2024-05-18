import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/singlePlant.module.css";
import ErrorPage from "./ErrorPage";
import Contact from "../components/Contact";
import AnimatedLeft from "../components/AnimatedLeft";
// icons
import CircleArrowLeft from "../assets/icons/circle-arrow-left-solid.svg";
import CircleArrowLeftDisabled from "../assets/icons/circle-arrow-left-solid_disabled.svg";
import SolidHeart from "../assets/icons/heart-solid.svg";
import RegularHeart from "../assets/icons/heart-regular.svg";
import DropletSolid from "../assets/icons/droplet-solid.svg";
import Cloud from "../assets/icons/cloud-solid.svg";
import Sun from "../assets/icons/sun-solid.svg";
import CloudSun from "../assets/icons/cloud-sun-solid .svg";
import SkullCrossbones from "../assets/icons/skull-crossbones-solid.svg";
import Utensils from "../assets/icons/utensils-solid.svg";
import LocationDot from "../assets/icons/location-dot-solid.svg";
import CircleArrowRight from "../assets/icons/circle-arrow-right-solid.svg";
import CircleArrowRightDisabled from "../assets/icons/circle-arrow-right-solid_disabled.svg";

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
    consent,
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
            currentPlant.default_image.original_url) &&
          consent ? (
            <div className={style.imgContainer}>
              <img
                className={style.img}
                src={
                  currentPlant.default_image.original_url ||
                  currentPlant.default_image.small_url
                }
                alt={`${currentPlant.common_name}, image source: pixabay.com`}
              />
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
            <div className={style.imgReplacement}>No image available</div>
          )}

          <div className={style.middleSec}>
            {currentIndex === 0 ? (
              <CircleArrowLeftDisabled className={style.switchDisabled} />
            ) : (
              <CircleArrowLeft onClick={goToPrev} className={style.switch} />
            )}
            <div className={style.card}>
              {favorites.includes(currentPlant) ? (
                <SolidHeart className={style.heart} onClick={toggleFavorites} />
              ) : (
                <RegularHeart
                  className={style.heart}
                  onClick={toggleFavorites}
                />
              )}
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
                    Watering: <DropletSolid className={style.droplet} />{" "}
                    {currentPlant.watering === "Average" && (
                      <DropletSolid className={style.droplet} />
                    )}{" "}
                    {currentPlant.watering === "Frequent" && (
                      <DropletSolid className={style.droplet} />
                    )}{" "}
                    {currentPlant.watering === "Frequent" && (
                      <DropletSolid className={style.droplet} />
                    )}
                  </p>
                  <p>
                    Sunlight:{" "}
                    {currentPlant.sunlight.includes("full shade") && (
                      <Cloud className={style.cloud} />
                    )}{" "}
                    {currentPlant.sunlight.includes("deep shade") && (
                      <Cloud className={style.cloud} />
                    )}{" "}
                    {currentPlant.sunlight.includes("full sun") && (
                      <Sun className={style.sun} />
                    )}{" "}
                    {currentPlant.sunlight.join("").includes("part") && (
                      <CloudSun className={style.cloudSun} />
                    )}
                  </p>
                  <p>
                    Poisonous:{" "}
                    {currentPlant.poisonous.toString().includes(true) && (
                      <SkullCrossbones className={style.skull} />
                    )}
                    {currentPlant.poisonous.toString().includes(false) && "no"}
                  </p>
                  <p>
                    Edible:{" "}
                    {currentPlant.poisonous.toString().includes(true) && (
                      <Utensils className={style.utensils} />
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
                      <LocationDot className={style.locationDot} />{" "}
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

            {currentIndex === plants.length - 1 ? (
              <CircleArrowRightDisabled className={style.switchDisabled} />
            ) : (
              <CircleArrowRight className={style.switch} onClick={goToNext} />
            )}
          </div>

          <div className={style.buttonSection}>
            {favorites.includes(currentPlant) &&
              navigateBack !== "/favorites" && (
                <button onClick={() => navigate("/favorites")}>
                  My favorites
                </button>
              )}
            {navigateBack !== "/adopt" && (
              <button onClick={() => navigate("/adopt")}>Go to Gallery</button>
            )}
            <button
              onClick={() => {
                navigate(navigateBack);
              }}
            >
              Go back
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <ErrorPage />
  );
};

export default SinglePlantPage;

// some comment
