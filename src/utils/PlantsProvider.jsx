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
      return Number(action.value);
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
  const [plantSelection, setPlantSelection] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [wateringFilter, setWateringFilter] = useState("all");
  const [sunlightFilter, setSunlightFilter] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [currentPlant, setCurrentPlant] = useState();
  const [currentIndex, setCurrentIndex] = useState();

  // result matching:
  const [resultMatching, setResultMatching] = useState([]);

  const baseUrl =
    "https://perenual.com/api/species-list?key=sk-wAxL6634fec4529a75333&indoor=1";

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
      common_name: plant.common_name
        .split("-")
        .map((name) => name.slice(0, 1).toUpperCase() + name.slice(1))
        .join(" "),
    }));
    setPlants(fakeDataWithLocation);
    setPlantSelection(fakeDataWithLocation);
  }, []);

  // Für echtes Fetching (nur Seite 1):
  // useEffect(() => {
  //   const fetchPlants = async () => {
  //     try {
  //       const res = await fetch(`${baseUrl}/page=1`);
  //       const resJson = await res.json();
  //       const dataWithLocation = resJson.data.map((plant) => ({
  //         ...plant,
  //         firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
  //         locations: [getRandomLocations()],
  //         common_name: plant.common_name
  //           .split("-")
  //           .map((name) => name.slice(0, 1).toUpperCase() + name.slice(1))
  //           .join(" "),
  //       }));
  //       setPlants(dataWithLocation);
  //       setPlantSelection(dataWithLocation);
  //       return dataWithLocation;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   // fetchPlants();
  // }, []);

  // Für echtes Fetching mit mehreren Seiten gleichzeitig:
  // useEffect(() => {
  //   const fetchMultiplePages = async () => {
  //     const fetchPromises = [];
  //     for (let i = 1; i < 3; i++) {
  //       const pageUrl = `${baseUrl}&page=${i}`;
  //       fetchPromises.push(fetch(pageUrl));
  //     }
  //     try {
  //       const allResponses = await Promise.all(fetchPromises);
  //       const allPlants = [];
  //       for (let res of allResponses) {
  //         const resJson = await res.json();
  //         const dataWithLocation = await resJson.data.map((plant) => ({
  //           ...plant,
  //           firstName:
  //             firstNames[Math.floor(Math.random() * firstNames.length)],
  //           locations: [getRandomLocations()],
  //           common_name: plant.common_name
  //             .split("-")
  //             .map((name) => name.slice(0, 1).toUpperCase() + name.slice(1))
  //             .join(" "),
  //         }));
  //         allPlants.push(dataWithLocation);
  //       }
  //       setPlants(allPlants.flat());
  //       setPlantSelection(allPlants.flat());
  //       return plants;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   // fetchMultiplePages();
  // }, []);
  // console.log(plants);

  return (
    <PlantsContext.Provider
      value={{
        plants,
        setPlants,
        count,
        dispatch,
        resultMatching,
        setResultMatching,
        plantSelection,
        setPlantSelection,
        searchInput,
        setSearchInput,
        locationFilter,
        setLocationFilter,
        wateringFilter,
        setWateringFilter,
        sunlightFilter,
        setSunlightFilter,
        favorites,
        setFavorites,
        currentPlant,
        setCurrentPlant,
        currentIndex,
        setCurrentIndex,
      }}
    >
      {children}
    </PlantsContext.Provider>
  );
};

export default PlantsProvider;
export const usePlantsContext = () => useContext(PlantsContext);
