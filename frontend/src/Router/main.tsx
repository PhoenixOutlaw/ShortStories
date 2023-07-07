import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth from "../components/Auth";
import AuthGuard from "../guard/AuthGuard";
import Authentication from "../Views/Authentication";
import Dashboard from "../Views/Dashboard";
import Home from "../Views/Home";
import Profile from "../Views/Profile";
import Stories from "../Views/Stories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard element={<Home />} />,
    children: [
      {
        index: true,
        element: <Navigate to='/home'/>,
      },
      {
        path:"home",
        element: <AuthGuard element={<Stories />} />,
      },
      {
        path: "dashboard",
        element: <AuthGuard element={<Dashboard/>} role={['admin']} />,
      },
      {
        path: "profile/:id",
        element: <AuthGuard element={<Profile />} />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Authentication />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <Auth login />,
      },
      {
        path: "register",
        element: <Auth />,
      },
      {
        path: "*",
        element: <Navigate to="/auth" replace />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
