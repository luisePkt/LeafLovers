import { useEffect, useState } from "react";
import locations from "./locations";
import { fakePlants } from "./FakeData";

const FetchPerenual = () => {
  const url =
    "https://perenual.com/api/species-list?key=sk-wAxL6634fec4529a75333&indoor=1&cycle=perennial";

  const [plants, setPlants] = useState([]);

  // das hier auskommentieren um zu fetchen statt zu faken:
  useEffect(() => {
    const fakeDataWithLocation = fakePlants.map((plant) => ({
      ...plant,
      location: locations[Math.floor(Math.random() * locations.length)],
    }));
    setPlants(fakeDataWithLocation);
  }, []);

  //das hier einkommentieren um zu fetchen statt zu faken:
  // useEffect(() => {
  //   const fetchPlants = async () => {
  //     try {
  //       const res = await fetch(url);
  //       const resJson = await res.json();
  //       const dataWithLocation = resJson.data.map((plant) => ({
  //         ...plant,
  //         location: locations[Math.floor(Math.random() * locations.length)],
  //       }));
  //       setPlants(dataWithLocation);
  //       return dataWithLocation;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   // fetchPlants();
  // }, []);

  console.log(plants);

  return (
    <div>
      <h1>Zimmerpflanzen</h1>
      {plants.length !== 0 && (
        <ul>
          {plants.map((plant) => (
            <li key={plant.id}>
              <h2>{plant.common_name}</h2>
              {plant.default_image && (
                <img
                  src={plant.default_image.original_url}
                  alt={plant.common_name}
                  style={{ width: "100px" }}
                />
              )}

              <p>Location: {plant.location}</p>
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

export default FetchPerenual;
