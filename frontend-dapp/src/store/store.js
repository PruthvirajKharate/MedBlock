import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice.js";
import currentUserReducer from "./currentUserSlice.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    currentUser: currentUserReducer,
  },
});
