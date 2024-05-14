import {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from "react";
import { fakePlants } from "./FakeDataNoImages";
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
  const [plants, setPlants] = useState(fakePlants);
  const [count, dispatch] = useReducer(reducer, initialState);
  const [plantSelection, setPlantSelection] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [wateringFilter, setWateringFilter] = useState("all");
  const [sunlightFilter, setSunlightFilter] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [currentPlant, setCurrentPlant] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [navigateBack, setNavigateBack] = useState("/swap");

  const [images, setImages] = useState([]);

  // result matching:
  const [resultMatching, setResultMatching] = useState([]);

  const getRandomDetails = (x, count) => {
    const detailsList = [];
    while (detailsList.length < count) {
      const currentDetail =
        x === "locations"
          ? locations[Math.floor(Math.random() * locations.length)]
          : firstNames[Math.floor(Math.random() * firstNames.length)];
      if (!detailsList.includes(currentDetail)) {
        detailsList.push(currentDetail);
      }
    }
    return detailsList;
  };

  const getRandomImage = () =>
    images[Math.floor(Math.random() * images.length)].webformatURL;

  // Für image fetching:
  const imageUrl =
    "https://pixabay.com/api/?key=43872314-bb096b563b1f4ad0208d0f3e5&q=garden+plant&image_type=photo";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${imageUrl}&per_page=200`);
        const resJson = await res.json();
        const imgs = resJson.hits.map((plant) => ({
          ...plant,
        }));
        console.log("imgs", imgs);
        setImages(imgs);
        return imgs;
      } catch (error) {
        console.log(error);
      }
    };
    fetchImages();
  }, []);


  // Für Fakedata:
  useEffect(() => {
    if (images.length > 0) {
      console.log("images", images);
      const dataWithDetails = plants.map((plant) => {
        let count = Math.floor(Math.random() * 3 + 1);
        let image = getRandomImage();
        return {
          ...plant,
          firstNames: getRandomDetails("firstNames", count),
          locations: getRandomDetails("locations", count),
          default_image: {
            original_url: image,
            small_url: image,
            thumbnail: image,
          },
        };
      });
      setPlants(dataWithDetails);
      setPlantSelection(dataWithDetails);
      console.log("plants", plants);
    }
  }, [images]);


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
        navigateBack,
        setNavigateBack,
      }}
    >
      {children}
    </PlantsContext.Provider>
  );
};

export default PlantsProvider;
export const usePlantsContext = () => useContext(PlantsContext);
