import { useParams } from "react-router-dom";
import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/swap.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const SinglePlantPage = () => {
  const { id } = useParams();
  const { plants } = usePlantsContext();

  //   const initializeCount = () => {
  //     dispatch({ type: "set", value: 1 });
  //   };
  //   initializeCount();

  return (
    <div className={style.cardsContainer}>
      {plants &&
        plants.length > 0 &&
        plants
          .filter((plant) => plant.id.toString() === id)
          .map((plant) => (
            <div key={plant.id} className={style.singleCard}>
              <p className={style.location}>
                <FontAwesomeIcon icon={faLocationDot} />
                {" " + plant.locations.join(", ")}
              </p>
              {plant.default_image ? (
                <img
                  src={plant.default_image.original_url}
                  alt={plant.common_name}
                />
              ) : (
                <div className={style.imgReplacement}>No image available</div>
              )}
              <h4>{plant.firstName}</h4>
              <p>{plant.common_name}</p>
              <h5>This plant needs:</h5>
              <p>{plant.watering} watering</p>
              <p>{plant.sunlight}.join("/") sunlight</p>
            </div>
          ))}
    </div>
  );
};

export default SinglePlantPage;
