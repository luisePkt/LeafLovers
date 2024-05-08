import style from "../styles/swap.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const SwapSinglePlant = ({ firstName, locations, common_name, src }) => {
  return (
    <li className={style.card}>
      <p className={style.location}>
        <FontAwesomeIcon icon={faLocationDot} />
        {locations[0]}
        {locations.length > 1 && ` and ${locations.length - 1} other location`}
        {+locations.length > 2 ? "s" : ""}
      </p>
      {src ? (
        <img src={src.original_url} alt={common_name} />
      ) : (
        <div className={style.imgReplacement}>No image available</div>
      )}
      <h4>{firstName}</h4>
      <p>{common_name}</p>
    </li>
  );
};

export default SwapSinglePlant;
