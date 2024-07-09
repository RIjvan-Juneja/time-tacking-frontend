// src/features/task/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postRequest } from '../../common/helper/postRequest'; // Adjust the path to where your function is located

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const { result } = await postRequest('/task/api/getTasks');
  console.log(result);
  return result;
});

const taskSlice = createSlice({
  name: 'tasks',
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
      .addCase(fetchTasks.pending, (state) => {
        state.task.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.task.status = 'succeeded';
        state.task.data = action.payload;
        state.task.error = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.task.status = 'failed';
        state.task.error = action.error.message;
      });
  }
});

export default taskSlice.reducer;
