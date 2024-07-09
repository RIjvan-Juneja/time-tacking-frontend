import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    status: STATUSES.SUCCESS,
  },
  reducers: {
    setproducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    
    fetchCartProducts(state, action) { 

      const cartProducts = action.payload;  

      return state.data.map((product) => {
        const cartProduct = cartProducts.find((cp) => cp.id === product.id);
        if(cartProduct){
          return {
            ...product,
            cartCount: cartProduct ? cartProduct.cartCount : 0,
          };
        }else {
          // const data = state.data.filter((product) => product.id !== payload)
          // console.log("else");
        }
        
      });
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllProduct.pending, (state) => {
      state.status = STATUSES.LOADING;
    })
    builder.addCase(fetchAllProduct.rejected, (state, action) => {
      console.error(action.error);
      state.status = STATUSES.ERROR;
      state.data = action.error;
    })
    builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUSES.SUCCESS;
    })
  }
})


export const { setproducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

