import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import MatchingPage from "../pages/MatchingPage";
import ResultPage from "../pages/ResultPage";
import SwapPage from "../pages/SwapPage";
import PlantsProvider from "./PlantsProvider";
import SinglePlantPage from "../pages/SinglePlantPage";
import FavoritesPage from "../pages/FavoritesPage";
import LegalNotice from "../pages/LegalNotice";

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
          path: "/adopt",
          element: <SwapPage />,
        },
        {
          path: "/plant/:id",
          element: <SinglePlantPage />,
        },
        { path: "/favorites", element: <FavoritesPage /> },
        { path: "/legal", element: <LegalNotice /> },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <PlantsProvider>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </PlantsProvider>
  );
};

export default Router;
