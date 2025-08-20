import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { AuthProvider } from "react-oauth2-code-pkce";
import { authConfig } from "./authConfig";
import { store } from "./store/store";

import App from "./App";
import { BrowserRouter } from "react-router";
import { ThemeInit } from "../.flowbite-react/init";

// As of React 18
const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <>
      <ThemeInit />
      <AuthProvider authConfig={authConfig}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </>
  );
}
