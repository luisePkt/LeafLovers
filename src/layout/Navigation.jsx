import { useEffect, useState } from "react";
import HomePage from "../pages/HomePage";
import MatchingPage from "../pages/MatchingPage";
import SwapPage from "../pages/SwapPage";
import { Link, NavLink } from "react-router-dom";
import style from "../styles/navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo_klein_farbig.svg";
import { useRef } from "react";
import FavoritesPage from "../pages/FavoritesPage";

const Navigation = () => {
  // show and hide navBar:
  const [showBars, setShowBars] = useState(false);

  // reference navMenu to hide mobile nav-menu while selecting category:
  const navMenuRef = useRef(null);

  // reference faBars to check if click is on menuIcon or outside:
  const menuIconRef = useRef(null);

  const routes = [
    // { id: 0, name: "home", to: "/", element: <HomePage /> },
    {
      id: 1,
      name: "matching",
      to: "/matching",
      element: <MatchingPage />,
    },
    { id: 2, name: "swap", to: "/swap", element: <SwapPage /> },
    { id: 3, name: "favorites", to: "/favorites", element: <FavoritesPage /> },
  ];

  // show and hide navMenu with click on navBar:
  const handleShowBars = () => {
    setShowBars(!showBars);
  };

  // hide mobile nav-menu while selecting category:
  const handleCloseNavMenu = () => {
    setShowBars(false);
  };

  // hide mobile nav-menu while clicking outside of nav-menu:
  const closeNavOnClickOutside = (event) => {
    // check if navMenu is open and is click is outside of navMenu:
    // checks if navMenu is mounted(open) && cklick is not inside navMenu && click is not on navIcon
    if (
      navMenuRef.current &&
      !navMenuRef.current.contains(event.target) &&
      !menuIconRef.current.contains(event.target)
    ) {
      setShowBars(false);
    }
  };

  useEffect(() => {
    // if navMenu mounted
    document.addEventListener("mousedown", closeNavOnClickOutside);
    return () => {
      // while navMenu is unmounted
      document.removeEventListener("mousedown", closeNavOnClickOutside);
    };
  }, []);

  return (
    <nav>
      {/* logo */}
      <div className={style.logo}>
        {/* <p>FL</p> */}
        <Link to="/">
          <img src={logo} alt="Logo LeafLovers" style={{ width: "70px" }} />
        </Link>
      </div>

      {/* bars */}
      <div className={style.menuIcon} ref={menuIconRef}>
        <FontAwesomeIcon icon={faBars} onClick={handleShowBars} />
      </div>

      {/* nav */}
      <div
        ref={navMenuRef}
        // onBlur={closeNavOnClickOutside}
        onClick={closeNavOnClickOutside}
        className={`${style.navElements} ${showBars && style.active}`}
      >
        <ul onClick={handleCloseNavMenu}>
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
