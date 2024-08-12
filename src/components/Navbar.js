import React from 'react';
import {
  AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, TextField, Box, InputAdornment,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

const Navbar = ({
  Dark, setDark, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories,
  totalCount, activeCount, completedCount, showAllTasks, filterStatus, setFilterStatus,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState(searchTerm);
  const [statusMenuAnchor, setStatusMenuAnchor] = React.useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setSearchTerm(event.target.value); // Update search term live
  };

  const handleFilterMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusMenuOpen = (event) => {
    setStatusMenuAnchor(event.currentTarget);
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchor(null);
  };

  const handleStatusChange = (status) => {
    setFilterStatus(status);
    handleStatusMenuClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundImage: 'radial-gradient(circle farthest-corner at 12.3% 19.3%, rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2%)',
        backgroundSize: 'cover',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        {/* Left Section: Search */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Todos..."
            value={searchValue}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                caretColor: '#021526', // Inline style for caret color
                '&::selection': {
                  background: '#FF204E', // Inline style for selection background color
                  color: '#fff', // Inline style for selection text color
                },
              },
            }}
            sx={{ flexGrow: 1, maxWidth: 300, mr: 2 }}
          />
          <IconButton
            color="inherit"
            aria-controls="filter-menu"
            aria-haspopup="true"
            onClick={handleFilterMenuOpen}
            sx={{ ml: 2, '@media (max-width: 600px)': { ml: 1 } }}
          >
            <FilterListIcon fontSize="small" />
          </IconButton>
          <Menu
            id="filter-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleFilterMenuClose}
          >
            <MenuItem onClick={() => handleCategoryClick('all')}>All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} onClick={() => handleCategoryClick(category)}>
                {category}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Middle Section: Status Filter with Icon */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            onClick={handleStatusMenuOpen}
            sx={{ ml: 2 }}
          >
            <DonutLargeIcon fontSize="small" />
          </IconButton>
          <Menu
            id="status-menu"
            anchorEl={statusMenuAnchor}
            keepMounted
            open={Boolean(statusMenuAnchor)}
            onClose={handleStatusMenuClose}
          >
            <MenuItem onClick={() => handleStatusChange('all')}>All</MenuItem>
            <MenuItem onClick={() => handleStatusChange('active')}>Active</MenuItem>
            <MenuItem onClick={() => handleStatusChange('completed')}>Completed</MenuItem>
          </Menu>
        </Box>

        {/* Right Section: Counts Only */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Total Count with Message Icon */}
          <IconButton color="inherit" onClick={showAllTasks} sx={{ mr: 2 }}>
            <Badge badgeContent={totalCount} color="secondary">
              <ChatRoundedIcon fontSize="small" />
            </Badge>
          </IconButton>

          {/* Dark Mode Toggle */}
          <IconButton color="inherit" onClick={() => setDark(!Dark)}>
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon fontSize="small" />
            ) : (
              <Brightness4Icon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
