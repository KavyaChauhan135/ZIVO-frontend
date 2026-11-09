import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";

const AppRoutes = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "about",
          element: <h1>About Page</h1>,
        },
        {
          path: "services",
          element: <h1>Services Page</h1>,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
