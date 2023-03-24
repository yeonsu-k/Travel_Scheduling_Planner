import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";
// import persistReducer from "./";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const persistor = persistStore(store);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </HelmetProvider>,
);
