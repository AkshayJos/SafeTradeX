import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./State/Store.js";
import { SearchProvider } from "./context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <StrictMode> */}
    <SearchProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SearchProvider>
    {/* </StrictMode> */}
  </BrowserRouter>
);
