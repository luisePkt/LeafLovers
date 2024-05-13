import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/singlePlant.module.css";
import { useEffect, useRef } from "react";

const Contact = ({ setShowContact, setShowThankyou }) => {
  const { currentPlant } = usePlantsContext();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form
      className={style.contact}
      onSubmit={(e) => {
        e.preventDefault;
        setShowContact(false);
        setShowThankyou(true);
      }}
    >
      <h4>Write a message!</h4>

      <label htmlFor="location">
        Plant&apos;s location
        <select name="location" id="location" ref={inputRef}>
          {currentPlant.locations.map((location, index) => (
            <option key={index}>{location}</option>
          ))}
        </select>
      </label>
      <label htmlFor="name">
        Your name{" "}
        <input
          type="text"
          id="name"
          placeholder="Your name"
          required
        />
      </label>
      <label htmlFor="email">
        Your email
        <input type="email" id="email" placeholder="Your email" required />
      </label>
      <label htmlFor="message">
        Your message
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          placeholder={`Hi there, I would like to adopt your plant ${currentPlant.firstName}. Please let me know if it is still available. Thanks!`}
          required
        ></textarea>{" "}
      </label>
      <button type="submit">Send</button>
    </form>
  );
};

export default Contact;
