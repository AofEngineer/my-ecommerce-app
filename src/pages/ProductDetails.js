import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Box,
  Button,
  Rating,
  Chip,
  Container,
  ImageList,
  ImageListItem,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentProductImage, setCurrentProductImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products/" + id)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id, dispatch]);
  if (loading) {
    return <CircularProgress />;
  }
  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", product });
  };

  const discountPercent = (discountPercentage) => {
    const str = discountPercentage + "% OFF";
    return str;
  };
  const curRency = (number) => {
    const out = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(number.price - (number.price * number.discountPercentage) / 100);
    return out;
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ padding: "20px" }}>
        <Grid container spacing={4} sx={{ pt: "100px", pl: "100px" }}>
          {/* Image Section */}
          <Grid item xs={12} sm={6}>
            <Card
              raised
              sx={{
                maxWidth: 500,
                maxHeight: 500,
                margin: "0 auto",
                padding: "0.1em",
              }}
            >
              <CardMedia
                component="img"
                alt="Product Image"
                height="500"
                image={product.images[currentProductImage]}
                title={product.title}
                sx={{ padding: "1em 1em 0 1em" }}
              />
            </Card>
            <ImageList
              sx={{
                maxWidth: 500,
                height: 180,
                pl: 10,
              }}
              cols={3}
              rowHeight={160}
            >
              {product.images.map((item, index) => (
                <ImageListItem
                  key={index}
                  sx={{ boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)" }}
                >
                  <img
                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                    alt={item}
                    onClick={() => setCurrentProductImage(index)}
                    loading="lazy"
                    style={{
                      filter:
                        currentProductImage === index ? "opacity(0.5)" : "",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>

          {/* Details Section */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h4" gutterBottom>
                {product.title}
              </Typography>
              <Rating name="read-only" value={product.rating} readOnly />
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginTop: "8px" }}
              >
                {product.sku}
              </Typography>
              <Box sx={{ marginTop: "16px" }}>
                <Typography variant="h5" color="error">
                  ${curRency(product)}{" "}
                  <Chip
                    label={discountPercent(product.discountPercentage)}
                    color="primary"
                    sx={{ marginLeft: "8px" }}
                  />
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  ${product.price}
                </Typography>
              </Box>

              <Box sx={{ marginTop: "16px" }}>
                <Typography variant="body1">Choose a bundle deal:</Typography>
                <Button
                  variant="outlined"
                  sx={{ marginRight: "8px", marginTop: "8px" }}
                >
                  No Deal
                </Button>
              </Box>

              <Box sx={{ marginTop: "16px" }}>
                <Typography variant="body1">Shipping:</Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.shippingInformation}
                </Typography>
              </Box>

              <Box
                sx={{
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button variant="contained" onClick={addToCart}>
                  Add to Cart
                </Button>
                <Button color="inherit" component={Link} to="/cart">
                  Cart
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductPage;
// eslint-disable-next-line no-lone-blocks
{
  /* <Button 
key={index}
onClick={() =>
  setCurrentProductImage((prevState) =>
    prevState === 0
      ? product.images.length - 1
      : prevState - 1
  )
}
sx={{
  "&:active": {
    backgroundColor: "primary",
  },
}}
>
</Button> */
}
