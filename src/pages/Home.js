// src/pages/Home.js
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import { CircularProgress } from "@mui/material";

const Home = ({ products, setSearch, search, setProducts }) => {
  const [loading, setLoading] = useState(true);
  const [onPage, setOnpage] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setOnpage(data.products);
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [setProducts]);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Sidebar
              products={products}
              setSearch={setSearch}
              search={search}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Grid container spacing={2}>
              <ProductList product={onPage} loading={loading} search={search} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
