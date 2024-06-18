import React, { useState } from "react";
import { Pagination, CircularProgress, Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductList = ({ product, loading, search }) => {
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * pageSize;
  const selectedProducts = product.slice(startIndex, startIndex + pageSize);

  const Productshow = search.length ? search : selectedProducts;
  const PaginationCal = search.length ? search : product;

  return (
    <>
      {Productshow.map((products, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          {loading ? <CircularProgress /> : <ProductCard product={products} />}
        </Grid>
      ))}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        paddingTop={5}
        paddingBottom={5}
      >
        <Pagination
          color="primary"
          count={Math.ceil(PaginationCal.length / pageSize)}
          page={page}
          onChange={handlePageChange}
        />
      </Grid>
    </>
  );
};

export default ProductList;
