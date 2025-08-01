import { createSlice } from "@reduxjs/toolkit";
import { saveCartToLocalStorage, loadCartFromLocalStorage } from "../../src/utils/utils";


const initialState = {
  cart: loadCartFromLocalStorage(),
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      saveCartToLocalStorage(state.cart);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
      saveCartToLocalStorage(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      saveCartToLocalStorage(state.cart);
    }
  }
})


export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;