import { configureStore } from "@reduxjs/toolkit";
import userReducer from "src/reduce/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
