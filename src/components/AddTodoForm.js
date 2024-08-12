import React, { useState } from 'react';
import { TextField, Grid, Box, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useForm } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';

// Add a Task

const AddTodoForm = ({ addTodo }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm();

  const handleFormSubmit = (data) => {
    setLoading(true);
    const newTodo = {
      id: Date.now(),
      text: data.text,
      category: data.category,
      dueDate: selectedDate.toISOString().split('T')[0], 
      completed: false,
    };
    
    setTimeout(() => {
      addTodo(newTodo);
      setLoading(false);
      reset(); 
      setSelectedDate(new Date()); 
    }, 1000); 
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="text"
              label="New Task"
              variant="outlined"
              {...register("text", { required: "Task is required" })}
              error={!!errors.text}
              helperText={errors.text?.message}
              spellCheck={true} // Enable spell check
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="category"
              select
              label="Category"
              variant="outlined"
              {...register("category", { required: "Category is required" })}
              error={!!errors.category}
              helperText={errors.category?.message}
              spellCheck={true} // Enable spell check
            >
              <MenuItem value="work">Work</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="shopping">Shopping</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <DatePicker
                label="Due Date"
                value={selectedDate}
                minDate={new Date()}
                onChange={(date) => setSelectedDate(date)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              loading={loading}
              variant="contained"
              size="medium"
              color="info"
              type="submit"
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              Add Item
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default AddTodoForm;
