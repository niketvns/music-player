import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AppContextProvider } from "./contexts";
import { AppLoader, ErrorProtector } from "./components";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <AppLoader />
      <ErrorProtector>
        <App />
      </ErrorProtector>
    </AppContextProvider>
  </React.StrictMode>
);
