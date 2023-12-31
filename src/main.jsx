import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { ChakraProvider } from "@chakra-ui/react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import AdminProvider from "./components/context/context";
import { BrowserRouter } from "react-router-dom";
import theme from "../theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AdminProvider>
          <App />
        </AdminProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
