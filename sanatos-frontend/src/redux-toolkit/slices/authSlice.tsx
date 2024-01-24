// authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  email: string | null;
  password: string | null;
  isAuthenticated: boolean;
  authenticationCode: string | null;
}

const initialState: AuthState = {
  email: null,
  password: null,
  isAuthenticated: false,
  authenticationCode: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Phase 1: User submits email and password
    startAuthentication: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isAuthenticated = false; // Reset authentication status
      state.authenticationCode = null; // Reset authentication code
    },
    // Phase 2: User submits authentication code
    completeAuthentication: (state, action: PayloadAction<{ authenticationCode: string }>) => {
      state.isAuthenticated = true;
      state.authenticationCode = action.payload.authenticationCode;
    },
    // Logout
    logout: (state) => {
      state.email = null;
      state.password = null;
      state.isAuthenticated = false;
      state.authenticationCode = null;
    },
  },
});

export const { startAuthentication, completeAuthentication, logout } = authSlice.actions;
export default authSlice.reducer;
