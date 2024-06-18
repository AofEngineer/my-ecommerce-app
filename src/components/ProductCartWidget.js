import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { reduceDuplicates } from "../utility/FuncreduceDuplicates";

// ----------------------------------------------------------------------

export default function CartWidget({ setOpenCart }) {
  const { cart, dispatch } = useCart();
  let reduced = reduceDuplicates(cart);

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const ref = useRef();
  useOnClickOutside(ref, () => setOpenCart(false));

  return (
    <Box sx={{ position: "absolute", right: "0", top: "45px" }}>
      <Paper elevation={3} ref={ref} sx={{ p: 2, width: 300 }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "text.secondary" }}
          >
            Cart
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ mt: 2, display: "grid", gap: 2 }}>
          {reduced.length === 0 ? (
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "text.secondary" }}
            >
              Your cart is empty
            </Typography>
          ) : (
            reduced.map((carts, index) => (
              <Box
                key={carts.value.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={carts.value.thumbnail}
                    alt={carts.value.title}
                    style={{ width: 50, height: 50, marginRight: 10 }}
                  />
                  <Box key={index}>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {carts.value.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {carts.value.price} x {carts.count}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "primary.main" }}
                    >
                      ${(carts.value.price * carts.count).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  key={carts.value.id}
                  onClick={() => removeFromCart(carts.value.id)}
                  alt="Delete"
                  style={{ width: 20, height: 20 }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))
          )}
        </Box>
        <Divider sx={{ my: 2 }} />
        {cart.length > 0 && (
          <Button variant="contained" fullWidth component={Link} to="/cart">
            Checkout
          </Button>
        )}
      </Paper>
    </Box>
  );
}
