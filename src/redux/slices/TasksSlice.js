// src/features/task/taskSlice.js
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
// import { postRequest } from '../../common/helper/postRequest'; // Adjust the path to where your function is located

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (args,{ getState }) => {

  const state = getState();
  const token = state.user.token;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/task/api/getTasks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include'
  })

  const result = await response.json();
  return result;
});

const taskSlice = createSlice({
  name: 'tasks',
  immer : false,
  initialState: {
    task: {
      data: [],
      filteredData: [],
      status: 'idle',
      error: false,
    },
  },
  reducers: {
    filterTasksByCategory: (state, action) => {
      const categoryId = action.payload;

      if(categoryId !=0){
        state.task.filteredData = state.task.data.data.filter(task => task?.category_id == categoryId);
      } else {
        state.task.filteredData = state.task.data.data
      }
   
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        return {
          ...state,
          task: {
           ...state.task,
            status: 'loading'
          }
        }
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        return {
          ...state,
          task: {
           ...state.task,
            data: action.payload,
            filteredData: action.payload.data,
            error: false,
            status: 'success'
          }
        }
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        return {
          ...state,
          task: {
           ...state.task,
            error: action.error.message,
            status: 'failed'
          }
        }
      });
  }
});

export default taskSlice.reducer;
export const {filterTasksByCategory} = taskSlice.actions;
