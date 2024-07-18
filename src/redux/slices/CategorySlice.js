// src/features/task/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../common/helper/postRequest'; // Adjust the path to where your function is located
import useFetch from '../../hooks/useFetch';

export const fetchCategory = createAsyncThunk('tasks/fetchTasks', async () => {
  const { result } = await postRequest('/task/api/getTasks');
  return result;
});

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    task: {
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
        state.task.status = 'loading';
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        console.log(action);
        state.task.status = 'success';
        state.task.data = action.payload;
        state.task.error = false;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.task.status = 'failed';
        state.task.error = action.error.message;
      });
  }
});

export default categorySlice.reducer;