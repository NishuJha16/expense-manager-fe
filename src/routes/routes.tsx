import { RouteObject } from "react-router-dom";
import Login from "../pages/authentication/login";
import Home from "../pages/home/home";
import ProtectedRoute from "./ProtectedRoutes";
import Register from "../pages/authentication/register";
import UserDataProvider from "../context/user-data-context/Provider";
import Expenses from "../pages/expenses/Expenses";
import Budgets from "../pages/budgets/Budgets";

export const routeObject: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <UserDataProvider />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/all-expenses",
        element: (
          <ProtectedRoute>
            <Expenses />
          </ProtectedRoute>
        ),
      },
      {
        path: "/budgets",
        element: (
          <ProtectedRoute>
            <Budgets />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
