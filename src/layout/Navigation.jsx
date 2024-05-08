import { useState } from "react";
import HomePage from "../pages/HomePage";
import MatchingPage from "../pages/MatchingPage";
import ResultPage from "../pages/ResultPage";
import SwapPage from "../pages/SwapPage";
import { NavLink } from "react-router-dom";
import style from "../styles/navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  // show and hide navBar:
  const [showBars, setShowBars] = useState(false);

  const routes = [
    { id: 0, name: "home", to: "/", element: <HomePage /> },
    {
      id: 1,
      name: "matching",
      to: "/matching",
      element: <MatchingPage />,
    },
    // { id: 2, name: "result", to: "/result", element: <ResultPage /> },
    //  NOTICE:id anpassen
    { id: 3, name: "swap", to: "/swap", element: <SwapPage /> },
  ];

  // show and hide navBar:
  const handleShowBars = () => {
    setShowBars(!showBars);
  };

  return (
    <nav>
      {/* logo */}
      <div className={style.logo}>
        <p>FL</p>
      </div>

      {/* bars */}
      <div className={style.menuIcon}>
        <FontAwesomeIcon icon={faBars} onClick={handleShowBars} />
      </div>

      {/* nav */}
      <div className={`${style.navElements} ${showBars && style.active}`}>
        <ul>
          {routes.map((route) => (
            <div key={route.id} className={style.linkContainer}>
              <li>
                <NavLink
                  to={route.to}
                  style={({ isActive }) => {
                    return isActive
                      ? { textDecoration: "underline" }
                      : undefined;
                  }}
                  className={style.navLink}
                >
                  {route.name}
                </NavLink>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
