import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
const store = configureStore({
  reducer: {
    cartSlice: cartReducer,
  },
})

export default store;