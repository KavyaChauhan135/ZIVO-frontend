import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import OAuthCallbackPage from "../pages/auth/OAuthCallbackPage";

// Created once at module level so the router isn't rebuilt on re-render.
const router = createBrowserRouter([
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
    element: <AuthLayout />,
    children: [
      {
        path: "auth",
        children: [
          { index: true, element: <Navigate to="/auth/login" replace /> },
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
          { path: "forgot-password", element: <ForgotPasswordPage /> },
        ],
      },
      // These two paths are fixed by the backend's redirect/email URLs.
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "oauth/callback", element: <OAuthCallbackPage /> },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
