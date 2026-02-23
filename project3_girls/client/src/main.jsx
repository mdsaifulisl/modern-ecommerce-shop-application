import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Context
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import { MediaProvider } from "./context/MediaContext.jsx";
import { ContactProvider } from "./context/ContactContext.jsx";
import { VisitProvider } from "./context/VisitContext";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <VisitProvider>
        <CartProvider>
          <OrderProvider>
            <ProductProvider>
              <MediaProvider>
                <ContactProvider>
                  <App />
                </ContactProvider>
              </MediaProvider>
            </ProductProvider>
          </OrderProvider>
        </CartProvider>
      </VisitProvider>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);


