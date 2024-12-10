import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice
const homeSlice = createSlice({
  name: 'home',
  initialState: { friendListUpdate: false },
  reducers: {
    resetPendingFriends: (state) => {
      state.friendListUpdate = true;
    },
    resetFriendListUpdate: (state) => {
      state.friendListUpdate = false;
    },
  },
});

// Export actions
export const { resetPendingFriends, resetFriendListUpdate } = homeSlice.actions;

// Configure the store
const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
  },
});

export default store;
