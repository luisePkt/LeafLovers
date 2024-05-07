import SwapOverview from "../components/SwapGallery";
import style from "../styles/swap.module.css";

const SwapPage = () => {
  return (
    <div className={style.main}>
      <h2>Find yourself a new plant friend in our Swap Exchange!</h2>
      <SwapOverview />
    </div>
  );
};

export default SwapPage;
