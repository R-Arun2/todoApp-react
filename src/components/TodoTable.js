import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AdjustIcon from '@mui/icons-material/Adjust';

// Custom pagination component for to show list of items
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

// TodoTable component
function TodoTable({ todos, page, rowsPerPage, handlePageChange, handleRowsPerPageChange, toggleComplete, deleteTodo }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(todo => (
            <TableRow key={todo.id}>
              <TableCell>{todo.text}</TableCell>
              <TableCell>{todo.category}</TableCell>
              <TableCell>{todo.dueDate}</TableCell>
              <TableCell>
                <IconButton onClick={() => toggleComplete(todo.id)}>
                  {todo.completed ? <CheckCircleIcon /> : <AdjustIcon />}
                </IconButton>
                <IconButton onClick={() => deleteTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={todos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        ActionsComponent={CustomPaginationActions}
      />
    </TableContainer>
  );
}

export default TodoTable;
