import { useEffect, useState } from "react";
import locations from "../utils/locations";

const FetchPerenual = () => {
  const url =
    "https://perenual.com/api/species-list?key=sk-wAxL6634fec4529a75333&indoor=1";

  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch(url);
        const resJson = await res.json();
        console.log(resJson);
        const dataWithLocation = resJson.data.map((plant) => ({
          ...plant,
          location: locations[Math.floor(Math.random() * locations.length)],
        }));
        setPlants(dataWithLocation);
        return dataWithLocation;
      } catch (error) {
        console.log(error);
      }
    };

    // fetchPlants(); //das hier einkommentieren um zu fetchen!
  }, []);

  return (
    <div>
      <h1>Zimmerpflanzen</h1>
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            <h2>{plant.common_name}</h2>
            {/* <img
              src={plant.default_image.original_url}
              alt={plant.common_name}
            /> */}
            <p>Location: {plant.location}</p>
            <p>Watering: {plant.watering}</p>
            <p>Sunlight: {plant.sunlight}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchPerenual;
