import SwapGallery from "../components/SwapGallery";
import style from "../styles/swap.module.css";
import { usePlantsContext } from "../utils/PlantsProvider";
import locations from "../utils/locations.js";

const SwapPage = () => {
  const {
    plants,
    count,
    dispatch,
    plantSelection,
    searchInput,
    setSearchInput,
    setLocationFilter,
    setWateringFilter,
    setSunlightFilter,
  } = usePlantsContext();

  const showMore = () => {
    if (count < plants.length) {
      dispatch({ type: "increase", value: 10 });
    }
  };
  return (
    <div className={style.main}>
      <h2>Find yourself a new plant-based friend in our Swap Exchange!</h2>

      <div className="filterContainer">
        {/* Search field */}
        <input
          className={style.searchInput}
          type="text"
          value={searchInput}
          placeholder="Search for plant names..."
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        {/* Location filter */}
        <select
          className={style.locationSelect}
          name="location"
          id="location"
          onChange={(e) => {
            setLocationFilter(e.target.value);
          }}
        >
          <option value="all">All Locations</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
        {/* Watering and Sunlight filters */}
        <label htmlFor="filterWatering">Watering: </label>
        <select
          className={style.wateringSelect}
          name="filterWatering"
          id="filterWatering"
          onChange={(e) => {
            setWateringFilter(e.target.value);
          }}
        >
          {" "}
          <option value="all">All</option>
          <option value="Frequent">Frequent</option>
          <option value="Average">Average</option>
          <option value="Minimum">Minimum</option>
        </select>
        <label htmlFor="filterSunlight">Sunlight: </label>
        <select
          className={style.sunlightSelect}
          name="filterSunlight"
          id="filterSunlight"
          onChange={(e) => {
            setSunlightFilter(e.target.value);
          }}
        >
          {" "}
          <option value="all">All</option>
          <option value="full sun">Full sun</option>
          <option value="part">Part shade</option>
          <option value="full shade">Full shade</option>
        </select>
      </div>

      <SwapGallery />

      <div className={style.buttonContainer}>
        <button
          onClick={showMore}
          disabled={
            plantSelection
              ? count >= plantSelection.length
              : count >= plants.length
          }
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default SwapPage;
