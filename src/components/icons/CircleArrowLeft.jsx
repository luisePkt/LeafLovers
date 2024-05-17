import circleArrowLeft from "../../assets/icons/circle-arrow-left-solid.svg";
import style from "../../styles/singlePlant.module.css";

const CircleArrowLeft = ({ onClick }) => {
  return (
    <svg
      xmlns={circleArrowLeft}
      viewBox="0 0 512 512"
      className={style.switch}
      onClick={onClick}
    >
      <path
        fill="currentColor"
        d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z"
      />
    </svg>
  );
};

export default CircleArrowLeft;
