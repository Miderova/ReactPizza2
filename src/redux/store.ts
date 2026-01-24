import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice.js";
import cart from "./slices/cartSlice.js";
import pizza from "./slices/pizzaSlice.js";
import { loadCartState, saveCartState } from "./localStorage";

const preloadedState = loadCartState();

const rootReducer = combineReducers({
  filter,
  cart,
  pizza,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState ? (preloadedState as any) : undefined,
});

export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  saveCartState(store.getState().cart);
});
