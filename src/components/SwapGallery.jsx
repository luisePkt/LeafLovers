import { useContext } from "react";
import { PlantsContext } from "../utils/PlantsProvider";
import style from "../styles/swap.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const SwapGallery = () => {
  const { plants } = useContext(PlantsContext);
  return (
    <div>
      {plants.length > 0 && (
        <ul className={style.container}>
          {plants.slice(0, 10).map((plant) => (
            <li className={style.card} key={plant.id}>
              <p className={style.location}>
                <FontAwesomeIcon icon={faLocationDot} />
                {plant.locations[0]} and 2 other locations
              </p>
              <h4>{plant.common_name}</h4>
              {plant.default_image && (
                <img
                  src={plant.default_image.original_url}
                  alt={plant.common_name}
                />
              )}

              {/* <p>Watering: {plant.watering}</p>
              <p>Sunlight: {plant.sunlight}</p>
              <p>Cycle: {plant.cycle}</p> */}
            </li>
          ))}
        </ul>
      )}{" "}
      <button>Show more</button>
    </div>
  );
};

export default SwapGallery;
