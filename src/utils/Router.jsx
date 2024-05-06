import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../assets/layout/Layout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import MatchingPage from "../pages/MatchingPage";
import ResultPage from "../pages/ResultPage";
import SwapPage from "../pages/SwapPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/matching",
          element: <MatchingPage />,
        },
        {
          path: "/result",
          element: <ResultPage />,
        },
        {
          path: "/swap",
          element: <SwapPage />,
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router}>
      <Layout />
    </RouterProvider>
  );
};

export default Router;