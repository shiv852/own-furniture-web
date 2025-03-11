import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
  totalItems: 0
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const itemIndex = state.wishlist.findIndex(item => item.id === action.payload.id);
      
      if (itemIndex >= 0) {
        // Item already exists in wishlist, do nothing or update if needed
        return;
      } else {
        // Add new item to wishlist
        const tempProduct = { ...action.payload };
        state.wishlist.push(tempProduct);
      }
      
      // Update total items
      state.totalItems = state.wishlist.length;
    },
    
    removeFromWishlist: (state, action) => {
      const nextWishlistItems = state.wishlist.filter(item => item.id !== action.payload.id);
      state.wishlist = nextWishlistItems;
      
      // Update total items
      state.totalItems = state.wishlist.length;
    },
    
    clearWishlist: (state) => {
      state.wishlist = [];
      state.totalItems = 0;
    }
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer; 