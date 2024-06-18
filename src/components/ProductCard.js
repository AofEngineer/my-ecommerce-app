// src/components/ProductCard.js
import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import { CardActionArea } from "@mui/material";

const MaxLengthTypography = ({ text, maxLength }) => {
  const truncatedText =
    text.length > 50 ? `${text.slice(0, maxLength)}...` : text;

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "wrap",
        maxWidth: "100%",
      }}
    >
      {truncatedText}
    </Typography>
  );
};
const ProductCard = ({ product }) => {
  return (
    <Card
      raised
      sx={{
        maxWidth: 500,
        minheight: 490,
        margin: "0 auto",
        padding: "0.1em",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <CardActionArea component={Link} to={`/product/${product.id}`}>
        <CardMedia
          component="img"
          alt={product.title}
          height="300"
          image={product.thumbnail}
          title={product.title}
        />
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
            }}
          >
            {product.title}
          </Typography>
          <MaxLengthTypography text={product.description} maxLength={50} />
          <Typography variant="h5" color="red">
            $ {product.price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
          <Typography size="small" color="primary" variant="contained">
            View Details
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
