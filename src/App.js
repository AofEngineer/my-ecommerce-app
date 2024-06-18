// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import HeaderLayout from "./layouts";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";

const App = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState([]);

  return (
    <HelmetProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <HeaderLayout products={products} setSearch={setSearch} />
              }
            >
              <Route index={true} element={<Navigate to="/home" />} />
              <Route
                path="home"
                element={
                  <Home
                    products={products}
                    setSearch={setSearch}
                    search={search}
                    setProducts={setProducts}
                  />
                }
              />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
};

export default App;
