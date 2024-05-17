import droplet from "../../assets/icons/droplet-solid.svg";

const Droplet = () => {
  return (
    <img
      src={droplet}
      alt="droplet"
      style={{
        width: "12px",
        display: "inline-block",
        position: "relative",
        top: "2px",
      }}
    />
  );
};

export default Droplet;
