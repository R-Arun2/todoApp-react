import React from 'react';
import { TextField, MenuItem } from '@mui/material';


// Filter by category

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => (
  <TextField
    fullWidth
    select
    label="Filter by Category"
    variant="outlined"
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
  >
    <MenuItem value="all">All</MenuItem>
    <MenuItem value="work">Work</MenuItem>
    <MenuItem value="personal">Personal</MenuItem>
    <MenuItem value="shopping">Shopping</MenuItem>
  </TextField>
);

export default CategoryFilter;
