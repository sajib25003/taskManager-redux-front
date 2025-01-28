import App from "@/App";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Tasks from "@/pages/Tasks";
import Users from "@/pages/Users";
import ProtectedRoutes from "@/providers/ProtectedRoutes";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        { index: true, element: <ProtectedRoutes><Tasks /></ProtectedRoutes> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/users", element: <Users /> },
    ],
  },
]);

export default routes;
