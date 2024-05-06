import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter, Route, RouteProps, Routes } from "react-router-dom";

import { LanguageContextProvider } from "./contexts/languageContext";
import { LoadingProvider } from "./contexts/loadingContext";
import { ModalContextProvider } from "./contexts/modalContext";
import { BarContextProvider } from "./contexts/barContext";

import WindowBar from "./components/windowBar";

import "./index.css";
import routes from "./pages";
import Update from "./components/update";

const contexts = [
  LoadingProvider,
  ModalContextProvider,
  LanguageContextProvider,
  BarContextProvider,
];

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    {contexts.reverse().reduce((acc, Context) => <Context>{acc}</Context>,
      <MemoryRouter>
        <WindowBar />
        <Routes>
          {routes.map((route, i) => (
            <Route key={i} {...route}/>
          ))}
        </Routes>
        <Update />
      </MemoryRouter>
    )}
  </React.StrictMode>
);