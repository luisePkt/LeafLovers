import {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from "react";
import { fakePlants } from "./FakeData";
import locations from "./locations";
import firstNames from "./firstNames";

const initialState = 10;
const reducer = (state, action) => {
  switch (action.type) {
    case "set":
      return action.value;
    case "increase":
      return state + action.value;
    case "reset":
      return initialState;
    default:
      return state;
  }
};

export const PlantsContext = createContext();

const PlantsProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [count, dispatch] = useReducer(reducer, initialState);

  const url =
    "https://perenual.com/api/species-list?key=sk-wAxL6634fec4529a75333&indoor";

  const getRandomLocations = () => {
    const list = [];
    for (let i = 0; i < Math.floor(Math.random() * 5 + 1); i++) {
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
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
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
  //          firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
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
    <PlantsContext.Provider value={{ plants, count, dispatch }}>
      {children}
    </PlantsContext.Provider>
  );
};

export default PlantsProvider;
export const usePlantsContext = () => useContext(PlantsContext);
