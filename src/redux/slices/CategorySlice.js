// src/features/task/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategory = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/task/api/categorys`,{
    method: 'POST'
  });
  const result = await response.json();
  return result;
});

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: {
      data: [],
      status: 'idle',
      error: false,
    },
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.category.status = 'loading';
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.category.status = 'success';
        state.category.data = action.payload.data;
        state.category.error = false;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.category.status = 'failed';
        state.category.error = action.error.message;
      });
  }
});

export default categorySlice.reducer;