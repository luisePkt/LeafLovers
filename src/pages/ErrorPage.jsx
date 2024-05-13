import { Link } from "react-router-dom";
import style from "../styles/error.module.css";

const ErrorPage = () => {
  return (
    <div className={style.main}>
      <h1>404</h1>
      <h2 className={style.element}>Error</h2>
      <h4 className={style.element}>
        The page you were looking for could not be found.
      </h4>
      <Link to="/" className={style.element}>
        <button>Go back to home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
