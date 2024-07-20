import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from './slices/TasksSlice';
import userReducer from './slices/UserSlice';
import categoryReducer from './slices/CategorySlice';


export const rootReducer = combineReducers({ 
  user: userReducer,
  tasks: taskReducer,
  category: categoryReducer
})