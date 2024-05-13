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
  const { favorites, setFavorites } = usePlantsContext();

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
            {plant.locations.length > 1 && plant.locations.slice(1).join(", ")}
          </span>
        </div>

        {plant.default_image && plant.default_image.thumbnail ? (
          <img
            className={style.img}
            src={plant.default_image.thumbnail}
            alt={plant.common_name}
          />
        ) : (
          <div className={style.imgReplacement}>No image available</div>
        )}
        <h4>{plant.firstName}</h4>
        <p>{plant.common_name}</p>
      </Link>
    </li>
  );
};

export default SinglePlant;
