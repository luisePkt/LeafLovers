import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/singlePlant.module.css";
import { useEffect, useRef, useState } from "react";
import locations from "../utils/locations";

const Contact = ({ setShowContact, setShowThankyou }) => {
  const { currentPlant } = usePlantsContext();
  const inputRef = useRef();
  const [input, setInput] = useState(currentPlant.locations[0]);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form
      className={style.contact}
      onSubmit={(e) => {
        e.preventDefault();
        setShowContact(false);
        setShowThankyou(true);
      }}
    >
      <h4>
        Adopt {"AEIOU".includes(currentPlant.common_name[0]) ? "an" : "a"}{" "}
        {currentPlant.common_name.toLowerCase()}!
      </h4>

      <label htmlFor="location">
        Choose a location
        <select
          name="location"
          id="location"
          ref={inputRef}
          onChange={() => {
            setInput(inputRef.current.value);
          }}
        >
          {currentPlant.locations.map((location, index) => (
            <option key={index}>{location}</option>
          ))}
        </select>
      </label>
      <label htmlFor="name">
        Name <input type="text" id="name" placeholder="Your name" required />
      </label>
      <label htmlFor="email">
        Email
        <input type="email" id="email" placeholder="Your email" required />
      </label>

      <label htmlFor="message">
        Message
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="10"
          placeholder={`Hi there, I would like to adopt your plant '${
            currentPlant.firstNames[currentPlant.locations.indexOf(input)]
          }'. Please let me know if it is still available. Thanks!`}
          required
        ></textarea>{" "}
      </label>
      <button type="submit">Send</button>
    </form>
  );
};

export default Contact;
