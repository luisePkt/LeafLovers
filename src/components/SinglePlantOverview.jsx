import style from "../styles/swap.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SinglePlant = ({ plant }) => {
  return (
    <li className={style.cardsLi}>
      {" "}
      <Link to={`/plant/${plant.id}`} className={style.card}>
        <p className={style.location}>
          <FontAwesomeIcon icon={faLocationDot} />
          {plant.locations[0]}
          {plant.locations.length > 1 && " and"}
          <span className={style.otherLocation}>
            {plant.locations.length > 1 &&
              `${plant.locations.length - 1} other location${
                plant.locations.length > 2 ? "s" : ""
              }`}
          </span>
          <span className={style.otherLocationDetail}>
            {plant.locations.length > 1 && plant.locations.slice(1).join(", ")}
          </span>
        </p>

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
