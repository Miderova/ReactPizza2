import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const calcTotalPrice = (items) =>
  items.reduce((sum, obj) => obj.price * obj.count + sum, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    
    minusItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );
      
      if (findItem && findItem.count > 1) {
        findItem.count--;
      } else {
        state.items = state.items.filter((obj) => 
          !(obj.id === action.payload.id && 
            obj.type === action.payload.type && 
            obj.size === action.payload.size)
        );
      }
      
      state.totalPrice = calcTotalPrice(state.items);
    },
    
    removeItem(state, action) {
      state.items = state.items.filter((obj) => 
        !(obj.id === action.payload.id && 
          obj.type === action.payload.type && 
          obj.size === action.payload.size)
      );
      
      state.totalPrice = calcTotalPrice(state.items);
    },
    
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id);


export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
