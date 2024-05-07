import { useContext } from "react";
import { PlantsContext } from "../utils/PlantsProvider";

const SwapPage = () => {
  const { plants } = useContext(PlantsContext);
  return (
    <div>
      <h3>Swap Meet</h3>
      {plants.length !== 0 && (
        <ul>
          {plants.slice(0, 3).map((plant) => (
            <li key={plant.id}>
              <h4>{plant.common_name}</h4>
              {plant.default_image && (
                <img
                  src={plant.default_image.original_url}
                  alt={plant.common_name}
                  style={{ width: "100px" }}
                />
              )}
              <p>Locations: {plant.locations.join(", ")}</p>
              <p>Watering: {plant.watering}</p>
              <p>Sunlight: {plant.sunlight}</p>
              <p>Cycle: {plant.cycle}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SwapPage;
