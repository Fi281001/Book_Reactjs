import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  avatar: "",
  username: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAvatar: (state, action) => {
      state.avatar = action.payload || initialState.avatar;
    },
    updateUser: (state, action) => {
      state.updateUser = action.payload || initialState.username;
    },
  },
});

export const { updateAvatar, updateUser } = userSlice.actions;

// Select state username from slice
export const selectUpdateAvatar = (state) => state.user.avatar;
export const selectUpdateUser = (state) => state.user.username;
// Export reducer
export default userSlice.reducer;
