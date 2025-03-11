import { configureStore } from "@reduxjs/toolkit";
import cardshoverSlice from "./CardsHoverSlice";
import userReducer from './userSlice';
import cartReducer from './cartSlice';

// fetchStatus ko use ham krenge fetchitems.jsx 

const furnitureStore=configureStore({
    reducer:{
        cardhoveritems:cardshoverSlice.reducer,
        user: userReducer,
        cart: cartReducer
    }
})
export default furnitureStore;