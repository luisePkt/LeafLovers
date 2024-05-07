import { createContext, useState, useEffect } from "react";
import { fakePlants } from "./FakeData";
import locations from "./locations";

export const PlantsContext = createContext();

const PlantsProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);

  const url =
    "https://perenual.com/api/species-list?key=sk-wAxL6634fec4529a75333&indoor";

  const getRandomLocations = () => {
    const list = [];
    for (let i = 0; i < 4; i++) {
      const current = locations[Math.floor(Math.random() * locations.length)];
      if (!list.includes(current)) {
        list.push(current);
      }
    }
    return list;
  };

  // Für Fakedata:
  useEffect(() => {
    const fakeDataWithLocation = fakePlants.map((plant) => ({
      ...plant,
      locations: getRandomLocations(),
    }));
    setPlants(fakeDataWithLocation);
  }, []);

  // Für echtes Fetching:
  // useEffect(() => {
  //   const fetchPlants = async () => {
  //     try {
  //       const res = await fetch(url);
  //       const resJson = await res.json();
  //       const dataWithLocation = resJson.data.map((plant) => ({
  //         ...plant,
  //         locations: [getRandomLocation(), getRandomLocation(), getRandomLocation(), getRandomLocation()],
  //       }));
  //       setPlants(dataWithLocation);
  //       return dataWithLocation;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   // fetchPlants();
  // }, []);
  // console.log(plants);

  return (
    <PlantsContext.Provider value={{ plants }}>
      {children}
    </PlantsContext.Provider>
  );
};

export default PlantsProvider;
