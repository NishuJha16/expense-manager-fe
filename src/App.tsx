import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { routeObject } from "./routes/routes";

const router = createBrowserRouter(routeObject);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
