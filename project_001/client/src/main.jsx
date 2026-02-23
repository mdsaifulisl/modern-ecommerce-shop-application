import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Bootstrap the main application component
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// context
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
);
