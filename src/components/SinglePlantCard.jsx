import style from "../styles/swap.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faHeart as faSolidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { usePlantsContext } from "../utils/PlantsProvider";

const SinglePlant = ({ plant }) => {
  const { favorites, setFavorites, consent } = usePlantsContext();

  const toggleFavorites = (e) => {
    e.preventDefault();
    if (favorites.includes(plant)) {
      setFavorites(favorites.filter((p) => p.id !== plant.id));
    } else {
      setFavorites([...favorites, plant]);
    }
  };

  return (
    <li className={style.cardsLi}>
      {" "}
      <Link to={`/plant/${plant.id}`} className={style.card}>
        <FontAwesomeIcon
          icon={favorites.includes(plant) ? faSolidHeart : faRegularHeart}
          className={style.heart}
          onClick={toggleFavorites}
        />
        <p className={style.favInstruction}>
          {favorites.includes(plant)
            ? "Remove from favorites"
            : "Add to favorites"}
        </p>

        {plant.locations && (
          <div className={style.location}>
            <FontAwesomeIcon icon={faLocationDot} />

            {" " + plant.locations[0]}

            {plant.locations.length > 1 && " and "}

            <span className={style.otherLocation}>
              {plant.locations.length > 1 &&
                `${plant.locations.length - 1} other location${
                  plant.locations.length > 2 ? "s" : ""
                }`}
            </span>

            <span className={style.otherLocationDetail}>
              {plant.locations.length > 1 &&
                plant.locations.slice(1).join(", ")}
            </span>
          </div>
        )}

        {plant.default_image &&
        (plant.default_image.thumbnail ||
          plant.default_image.small_url ||
          plant.default_image.original_url) &&
        consent ? (
          <div className={style.imgContainer}>
            <img
              className={style.img}
              src={
                plant.default_image.thumbnail ||
                plant.default_image.small_url ||
                plant.default_image.original_url
              }
              alt={`${plant.common_name}, image source: pixabay.com`}
            />
            <p className={style.imageSource}>Source: pixabay</p>
          </div>
        ) : !consent ? (
          <div className={style.imgReplacement}>
            Image requires cookies
          </div>
        ) : (
          <div className={style.imgReplacement}>No image available</div>
        )}
        <h4>{plant.common_name}</h4>
        {plant.firstNames && (
          <p>
            <em>{plant.firstNames.join(", ")}</em>
          </p>
        )}
      </Link>
    </li>
  );
};

export default SinglePlant;
