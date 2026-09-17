import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "../../features/auth/ui/components/Login";
import Register from "../../features/auth/ui/components/Register";
import AuthLayout from "../layout/AuthLayout";
import ProtectedRoute from "./Protected.route";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMeThunk } from "../../features/auth/apis/authThank";
import HomePage from "../../features/main/ui/pages/HomePage";
import ProfilePage from "../../features/main/ui/components/Profile";
import CreatePostForm from "../../features/main/ui/components/CreatePostForm";
import Followers from "../../features/main/ui/components/Followers";
import MainProtected from "./MainProtected";
import MainLayout from "../layout/MainLayout";
const AppRoute = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMeThunk());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },

            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },

    {
      path: "/home",
      element: <MainProtected />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <HomePage />,
            },

            {
              path: "profile",
              element: <ProfilePage />,
            },

            {
              path: "followers",
              element: <Followers />,
            },

            {
              path: "create-post",
              element: <CreatePostForm />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoute;
