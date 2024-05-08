import SwapGallery from "../components/SwapGallery";
import style from "../styles/swap.module.css";
import { usePlantsContext } from "../utils/PlantsProvider";

const SwapPage = () => {
  const { plants, count, dispatch } = usePlantsContext();

  const showMore = () => {
    dispatch({ type: "increase", value: 50 });
  };
  return (
    <div className={style.main}>
      <h2>Find yourself a new plant-based friend in our Swap Exchange!</h2>
      <SwapGallery />

      <div className={style.buttonContainer}>
        <a href="#">
          <button>Back to top</button>
        </a>
        <button onClick={showMore} disabled={count >= plants.length}>
          Show more
        </button>
      </div>
    </div>
  );
};

export default SwapPage;
