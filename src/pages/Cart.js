// src/pages/Cart.js
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { reduceDuplicates } from "../utility/FuncreduceDuplicates";

const Cart = () => {
  const { cart, dispatch } = useCart();

  const handleCheckout = () => {
    alert("Checkout complete");
    dispatch({ type: "CLEAR_CART" });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  let reduced = reduceDuplicates(cart);
  let total = 0;
  reduced.map((item) => (total = total + item.value.price * item.count));
  return (
    <Container maxWidth="lg" sx={{ pt: "100px" }}>
      <Typography variant="h4">Shopping Cart</Typography>
      {reduced.length === 0 ? (
        <Typography variant="h6" mt={2}>
          Your cart is empty
        </Typography>
      ) : (
        <Container>
          <Grid container spacing={2} mt={2}>
            {reduced.map((item, index) => (
              <Grid item xs={12} key={index}>
                <CartItem item={item} removeFromCart={removeFromCart} />
              </Grid>
            ))}

            <Grid item xs={12} mt={2}>
              <Typography sx={{ mt: 1 }} variant="h5" align="right">
                Total
              </Typography>
              <Typography sx={{ mt: 1 }} variant="h4" align="right">
                ${total.toFixed(2)}
              </Typography>
            </Grid>

            <Grid item xs={12} mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={clearCart}
                sx={{ ml: 2 }}
              >
                Clear Cart
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
    </Container>
  );
};

export default Cart;
