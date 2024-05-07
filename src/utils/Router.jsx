import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout"
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import MatchingPage from "../pages/MatchingPage";
import ResultPage from "../pages/ResultPage";
import SwapPage from "../pages/SwapPage";
import PlantsProvider from "./PlantsProvider";

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
    <PlantsProvider>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </PlantsProvider>
  );
};

export default Router;
