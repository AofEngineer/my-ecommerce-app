// src/components/CartItem.js
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";

const CartItem = ({ item, removeFromCart }) => {
  return (
    <Card sx={{ display: "flex", alignItems: "center" }}>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={item.value.thumbnail}
        alt={item.value.title}
      />
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography variant="h6">{item.value.title}</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {item.value.price} x {item.count}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          ${item.value.price * item.count}
        </Typography>
      </CardContent>
      <Box m={10}>
        <IconButton
          key={item.value.id}
          onClick={() => removeFromCart(item.value.id)}
          alt="Delete"
          style={{ width: 20, height: 20 }}
        >
          <DeleteOutlineIcon sx={{ fontSize: 40 }} color="error" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default CartItem;
