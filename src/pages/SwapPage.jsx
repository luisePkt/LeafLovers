import { useNavigate } from "react-router-dom";
import SwapGallery from "../components/SwapGallery";
import style from "../styles/swap.module.css";
import { usePlantsContext } from "../utils/PlantsProvider";
import locations from "../utils/locations.js";
import { useEffect, useRef } from "react";

const SwapPage = () => {
  const {
    plants,
    count,
    dispatch,
    plantSelection,
    searchInput,
    setSearchInput,
    locationFilter,
    setLocationFilter,
    wateringFilter,
    setWateringFilter,
    sunlightFilter,
    setSunlightFilter,
    favorites,
    setNavigateBack,
  } = usePlantsContext();

  const navigate = useNavigate();
  const inputRef = useRef();

  const showMore = () => {
    if (count < plants.length) {
      dispatch({ type: "increase", value: 10 });
    }
  };

  const resetFilters = () => {
    setSearchInput("");
    setLocationFilter("all");
    setWateringFilter("all");
    setSunlightFilter("all");
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setNavigateBack ? setNavigateBack("/adopt") : null;
  }, [setNavigateBack]);

  return (
    <div className={style.main}>
      <h2>Adopt your new plant-based friend!</h2>

      <div className={style.filterContainer}>
        <div>
          {/* Search field */}
          <input
            className={style.searchInput}
            type="text"
            value={searchInput}
            ref={inputRef}
            placeholder="Search for plant"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        </div>
        <div>
          {/* Location filter */}
          <label className={style.filterLabel} htmlFor="location">
            Location:{" "}
          </label>
          <select
            className={style.locationSelect}
            name="location"
            id="location"
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(e.target.value);
            }}
          >
            <option value="all">All</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* Watering and Sunlight filters */}
          <label className={style.filterLabel} htmlFor="filterWatering">
            Watering:{" "}
          </label>
          <select
            className={style.wateringSelect}
            name="filterWatering"
            id="filterWatering"
            onChange={(e) => {
              setWateringFilter(e.target.value);
            }}
            value={wateringFilter}
          >
            {" "}
            <option value="all">All</option>
            <option value="Frequent">Frequent</option>
            <option value="Average">Average</option>
            <option value="Minimum">Minimum</option>
          </select>

          <label className={style.filterLabel} htmlFor="filterSunlight">
            Sunlight:{" "}
          </label>
          <select
            className={style.sunlightSelect}
            name="filterSunlight"
            id="filterSunlight"
            onChange={(e) => {
              setSunlightFilter(e.target.value);
            }}
            value={sunlightFilter}
          >
            {" "}
            <option value="all">All</option>
            <option value="full sun">Full sun</option>
            <option value="part">Part shade</option>
            <option value="full shade">Full shade</option>
          </select>
        </div>
        <button className={style.btnReset} onClick={resetFilters}>
          Reset
        </button>
      </div>

      <p className={style.resultsNum}>
        {plantSelection && plantSelection.length > 0
          ? `${plantSelection.length} matches`
          : null}
      </p>

      <SwapGallery />

      <div className={style.buttonContainer}>
        {favorites && favorites.length > 0 && (
          <button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/favorites/#");
            }}
          >
            My favorites
          </button>
        )}
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
