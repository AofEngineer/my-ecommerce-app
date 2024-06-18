// src/components/Sidebar.js
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Sidebar = ({ products, setSearch }) => {
  const [categories, setCategory] = useState([]);
  useEffect(() => {
    function list() {
      let a = [];
      a = categories.length ? categories : products.map((e) => e.category);
      a.push("All");
      a.sort();
      setCategory(a.filter((item, index) => a.indexOf(item) === index));
    }
    list();
  }, [categories, products]);
  const handleClick = (e) => {
    const Categories = e.target.innerText;
    const filtered = products.filter((products) =>
      products.category.toLowerCase().includes(Categories)
    );
    setSearch(filtered);
  };

  return (
    <Box bgcolor="background.paper" p={2}>
      <Typography variant="h6">Categories</Typography>
      <List>
        {categories.map((category, index) => (
          <ListItem button key={index} onClick={handleClick}>
            <ListItemText primary={category} name={category} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
