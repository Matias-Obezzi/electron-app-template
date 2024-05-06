import { RouteProps } from "react-router-dom";
import Home from "./home";

const routes : RouteProps[] = [
  {
    path: "/",
    element: <Home />
  }
];

export default routes