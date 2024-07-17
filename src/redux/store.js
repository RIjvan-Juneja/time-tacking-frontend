import { combineReducers, configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/TasksSlice';
import userReducer from './slices/UserSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({ 
  user: userReducer,
  tasks: taskReducer
})


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export const persistor = persistStore(store)