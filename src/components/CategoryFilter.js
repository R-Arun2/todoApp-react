import React, { useState, useEffect } from 'react';
import { Dropdown } from '@nextui-org/react';

const CategoryFilter = ({ todos, onCategoryChange }) => {
  const predefinedCategories = ['Work', 'Personal', 'Shopping'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories from todos and merge with predefined categories
  const categories = [...new Set([...predefinedCategories, ...todos.map(todo => todo.category)])];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <Dropdown>
      <Dropdown.Button flat>
        {selectedCategory}
      </Dropdown.Button>
      <Dropdown.Menu aria-label="Categories" onAction={handleCategoryChange}>
        <Dropdown.Item key="All">All</Dropdown.Item>
        {categories.map((category) => (
          <Dropdown.Item key={category}>{category}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategoryFilter;
