// src/components/Header.js
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Badge, Container } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductCartWidget from "../components/ProductCartWidget";
import { useCart } from "../context/CartContext";

const SearchInput = styled("input")({
  width: "300px",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginRight: "20px",
});

const Header = ({ products, setSearch }) => {
  const { cart } = useCart();
  const [openCart, setOpenCart] = useState(false);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = products.filter((products) =>
      products.title.toLowerCase().includes(searchTerm)
    );
    setSearch(filtered);
  };
  const handleClick = (event) => {
    setOpenCart(true);
    event.preventDefault();
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link
              to="/"
              onClick={() => {
                setSearch([]);
              }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Shopee Clone
            </Link>
          </Typography>
          <SearchInput
            id="search"
            placeholder="Search in Shopee"
            onChange={handleSearch}
          />

          <Badge showZero badgeContent={cart.length} color="error" max={99}>
            <ShoppingCartIcon onClick={handleClick} />
          </Badge>

          {openCart && <ProductCartWidget setOpenCart={setOpenCart} />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
