import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import style from "../styles/home.module.css";

const CookieBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "true", { expires: 365 });
    setIsVisible(false);
    window.location.reload();
  };

  return !isVisible ? null : (
    <div className={style.cookieBar}>
      <p>
        A third-party on this website uses cookies. By using our website, you
        agree to the use of third-party cookies. For blocking
        third-party-cookies, please change your browser settings.
      </p>
      <button onClick={handleAccept}>Accept</button>
    </div>
  );
};

export default CookieBar;
