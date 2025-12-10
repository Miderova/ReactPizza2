import { createSlice } from "@reduxjs/toolkit";
import Search from "../../components/Search";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // Ищем такую же пиццу (id, type, size должны совпадать)
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      if (findItem) {
        findItem.count++; // Увеличиваем количество, если нашли
      } else {
        state.items.push({
          ...action.payload,
          count: 1, // Добавляем поле count для новых пицц
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum; // Умножаем на количество!
      }, 0);
    },
    // ... остальные reducers
  },
});

export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
