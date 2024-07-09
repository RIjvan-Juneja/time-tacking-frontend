import { configureStore } from "@reduxjs/toolkit";
import {thunk} from 'redux-thunk';
  
const store = configureStore({
    reducer:{
      
    },
    middleware : (getDefualtMiddleware)=>{
       return getDefualtMiddleware().concat(thunk)
    }
    
})

export default store;