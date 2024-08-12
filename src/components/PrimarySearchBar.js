import React from 'react';
import { Box, Grid, ButtonGroup, Button } from '@mui/material';
import SearchBar from './SearchBar'; 
import CategoryFilter from './CategoryFilter'; 

const PrimarySearchBar = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, handleFilterStatusChange }) => (
  <Box mb={2}>
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Grid>
    </Grid>
    <Box mt={2} display="flex" justifyContent="center">
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onClick={() => handleFilterStatusChange('all')} sx={{ minWidth: '120px' }}>All</Button>
        <Button onClick={() => handleFilterStatusChange('active')} sx={{ minWidth: '120px' }}>Active</Button>
        <Button onClick={() => handleFilterStatusChange('completed')} sx={{ minWidth: '120px' }}>Completed</Button>
      </ButtonGroup>
    </Box>
  </Box>
);

export default PrimarySearchBar;
