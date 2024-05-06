import React from "react";
import HomePage from "../../pages/HomePage";
import MatchingPage from "../../pages/MatchingPage";
import ResultPage from "../../pages/ResultPage";
import SwapPage from "../../pages/SwapPage";
import { NavLink } from "react-router-dom";
import style from "../../styles/navigation.module.css";

const Navigation = () => {
  const routes = [
    { id: 0, name: "home", to: "/", element: <HomePage /> },
    {
      id: 1,
      name: "matching",
      to: "/matching",
      element: <MatchingPage />,
    },
    { id: 2, name: "result", to: "/result", element: <ResultPage /> },
    { id: 3, name: "swap", to: "/swap", element: <SwapPage /> },
  ];

  return (
    <nav>
                                
      <ul>
        {routes.map((route) => (
          <li key={route.id}>
            <NavLink
              to={route.to}
              style={({ isActive }) => {
                return isActive ? { textDecoration: "underline" } : undefined;
              }}
              className={style.navLink}
            >
              {route.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
