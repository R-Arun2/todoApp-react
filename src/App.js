import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton } from '@mui/material';
import { Skeleton } from 'antd';
import AddTodoForm from './components/AddTodoForm';
import Navbar from './components/Navbar';
import { useTodos } from './hooks/useTodos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AdjustIcon from '@mui/icons-material/Adjust';
import { Global } from '@emotion/react';
import { message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'; 

// Utility function to format date as day/mon/yy
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  return `${day}/${month}/${year}`;
};

function CustomPaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handlePageChange = (event, newPage) => {
    onPageChange(event, newPage);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={(event) => handlePageChange(event, Math.max(0, page - 1))}
        disabled={page === 0}
      >
        {'<'}
      </IconButton>
      <IconButton
        onClick={(event) => handlePageChange(event, Math.min(Math.ceil(count / rowsPerPage) - 1, page + 1))}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        {'>'}
      </IconButton>
    </Box>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { addTodo, deleteTodo, toggleComplete, filterTodos } = useTodos();
  const [Dark, setDark] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleKeyDown = useCallback((event) => {
    if (event.ctrlKey && event.key === 'a') {
      event.preventDefault();
      document.querySelector('input[name="text"]').focus();
    } else if (event.ctrlKey && event.key === 'd') {
      setDark(prevDark => !prevDark);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const handleFilterStatusChange = useCallback((status) => {
    setFilterStatus(status);
  }, []);

  const handleAddTodo = useCallback((newTodo) => {
    addTodo({
      ...newTodo,
      category: newTodo.category, // Use the category as is
    });
    message.success('Task Added'); // Ant Design success message
    setPage(0);
  }, [addTodo]);

  const filteredTodos = useMemo(() => {
    const todos = filterTodos(filterStatus)
      .filter(todo => {
        const matchesSearch = searchTerm === '' || todo.text.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || todo.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
    
    return todos.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
  }, [filterTodos, filterStatus, searchTerm, selectedCategory]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const theme = createTheme({
    palette: {
      mode: Dark ? 'dark' : 'light',
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif', // Add your desired font family here
    },
  });

  const handleShowTasksClick = () => {
    setLoading(true);
    setShowTable(prev => !prev);
    setTimeout(() => setLoading(false), 3000);
  };

  const handleDeleteTodo = useCallback((id) => {
    deleteTodo(id);
    message.open({
      content: 'Task Deleted',
      icon: <DeleteOutlined style={{ color: '#FF204E' }} />, // Set color here
      duration: 2,
    });  // Show custom error message with red delete icon
  }, [deleteTodo]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Global
        styles={{
          '.ant-skeleton': {
            backgroundColor: Dark ? '#333' : '#f5f5f5',
            borderRadius: '4px',
          },
          '.ant-skeleton-active .ant-skeleton-content': {
            backgroundColor: Dark ? '#555' : '#e0e0e0',
          },
          '.MuiTableCell-stickyHeader': {
            backgroundColor: Dark ? '#424242' : '#ffffff',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          },
          '.MuiTableContainer': {
            overflowX: 'auto',
          },
          'body': {
            fontFamily: 'Roboto, Arial, sans-serif', // Apply global font family
            fontSize: '16px',
            color: Dark ? '#e0e0e0' : '#333',
            backgroundColor: Dark ? '#121212' : '#fafafa',
          },
          'h1, h2, h3, h4, h5, h6': {
            fontFamily: 'Roboto, Arial, sans-serif', 
          },
          'a': {
            color: Dark ? '#bb86fc' : '#1a73e8', 
          },
        }}
      />

      <div className='App' data-theme={Dark ? 'dark' : 'light'}>
        <Navbar
          completedCount={filteredTodos.filter(todo => todo.completed).length}
          activeCount={filteredTodos.filter(todo => !todo.completed).length}
          Dark={Dark}
          setDark={setDark}
          searchTerm={searchTerm}
          setSearchTerm={handleSearchChange}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
          categories={['all', ...new Set(filteredTodos.map(todo => todo.category))]} // No title case conversion
          filterStatus={filterStatus}
          setFilterStatus={handleFilterStatusChange}
          totalCount={filteredTodos.length}
          showAllTasks={handleShowTasksClick}
        />

        <Container maxWidth="sm" sx={{ mt: 2 }}>
          <Box mb={2}>
            <AddTodoForm addTodo={handleAddTodo} />
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Button
              onClick={handleShowTasksClick}
              variant="contained"
              color="info"
              fullWidth
              sx={{ textTransform: 'none' }} // Prevent uppercase transformation
            >
              {showTable ? 'Hide' : 'Show Items'}
            </Button>
          </Box>

          {showTable && (
            <TableContainer
              sx={{
                maxHeight: 400, 
                overflowY: 'auto', 
              }}
            >
              {loading ? (
                <Skeleton active paragraph={{ rows: 5, width: ['60%', '100%', '80%'] }} />
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Task</b></TableCell>
                      <TableCell><b>Category</b></TableCell>
                      <TableCell><b>Due Date</b></TableCell>
                      <TableCell sx={{ pr: 5 }}><b>Status</b></TableCell> {/* Added padding-right */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTodos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(todo => (
                      <TableRow key={todo.id}>
                        <TableCell>{todo.text}</TableCell>
                        <TableCell>{todo.category}</TableCell>
                        <TableCell>{formatDate(todo.dueDate)}</TableCell> {/* Formatted due date */}
                        <TableCell sx={{ display: 'flex', gap: 1 }}>
                          <IconButton onClick={() => toggleComplete(todo.id)}>
                            {todo.completed ? (
                              <CheckCircleIcon style={{ color: '#008000' }} /> // Completed icon
                            ) : (
                              <AdjustIcon style={{ color: '#00A9FF' }} /> // Active icon
                            )}
                          </IconButton>
                          <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                            <DeleteOutlined style={{ color: '#FF4646' }} /> {/* Delete icon */}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          )}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredTodos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            ActionsComponent={CustomPaginationActions}
          />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
