import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      
      if (itemIndex >= 0) {
        // Item already exists in cart, increase quantity
        state.cart[itemIndex].quantity += action.payload.quantity;
      } else {
        // Add new item to cart
        const tempProduct = { ...action.payload };
        state.cart.push(tempProduct);
      }
      
      // Update total quantity and price
      state.totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.cart.reduce((total, item) => total + (item.discount_price * item.quantity), 0);
    },
    
    removeFromCart: (state, action) => {
      const nextCartItems = state.cart.filter(item => item.id !== action.payload.id);
      state.cart = nextCartItems;
      
      // Update total quantity and price
      state.totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.cart.reduce((total, item) => total + (item.discount_price * item.quantity), 0);
    },
    
    updateQuantity: (state, action) => {
      const itemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity = action.payload.quantity;
        
        // Update total quantity and price
        state.totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.cart.reduce((total, item) => total + (item.discount_price * item.quantity), 0);
      }
    },
    
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer; 