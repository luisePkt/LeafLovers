import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/favorites.module.css";
import SinglePlant from "../components/SinglePlantCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, setNavigateBack } = usePlantsContext();

  useEffect(() => {
    setNavigateBack ? setNavigateBack("/favorites") : null;
  }, [setNavigateBack]);

  return (
    <div className={style.main}>
      <h2>My Favorites</h2>

      <p className={style.resultsNum}>
        {favorites.length === 1
          ? `You have 1 favorite`
          : favorites.length > 1
          ? `You have ${favorites.length} favorites`
          : `No favorites yet`}
      </p>

      <div className={style.container}>
        {/* Singleplant Cards */}
        {favorites.length > 0 && (
          <ul className={style.cardsContainer}>
            {favorites.map((plant) => (
              <SinglePlant key={plant.id} plant={plant} />
            ))}
          </ul>
        )}{" "}
      </div>
      <section className={style.btnSection}>
        <button
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/adopt");
          }}
        >
          Discover more plants
        </button>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </button>
      </section>
    </div>
  );
};

export default FavoritesPage;
