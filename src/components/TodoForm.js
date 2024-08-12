// components/TodoForm.js

import React from 'react';
import { Grid, Box, ButtonGroup, Button } from '@mui/material';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import AddTodoForm from './AddTodoForm';

function TodoForm({ addTodo, handleSearchChange, handleCategoryChange, handleFilterStatusChange, searchTerm, selectedCategory, filterStatus }) {
  return (
    <Box mb={2}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
        </Grid>
        <Grid item>
          <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange} />
        </Grid>
        <Grid item>
          <ButtonGroup variant="outlined" aria-label="outlined button group" fullWidth>
            <Button onClick={() => handleFilterStatusChange('all')}>All</Button>
            <Button onClick={() => handleFilterStatusChange('active')}>Active</Button>
            <Button onClick={() => handleFilterStatusChange('completed')}>Completed</Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <AddTodoForm addTodo={addTodo} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TodoForm;
