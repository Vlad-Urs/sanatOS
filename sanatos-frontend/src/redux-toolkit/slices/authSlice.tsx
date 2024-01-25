import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  email: string | null;
  password: string | null;
  isAuthenticated: boolean;
  authenticationCode: string | null;
  correctedPath: string | null;
  registerPath: string | null; // New field for registration path
}

const initialState: AuthState = {
  email: null,
  password: null,
  isAuthenticated: false,
  authenticationCode: null,
  correctedPath: null,
  registerPath: null, // Initialize the new field
};

const storedAuthState = localStorage.getItem('authState');
const initialAuthState: AuthState = storedAuthState ? JSON.parse(storedAuthState) : initialState;

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    startAuthentication: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isAuthenticated = false;
      state.authenticationCode = null;
      state.correctedPath = null;
      state.registerPath = null; // Set registerPath to null when starting authentication
      localStorage.setItem('authState', JSON.stringify(state));
    },
    completeAuthentication: (state, action: PayloadAction<{ authenticationCode: string }>) => {
      state.isAuthenticated = true;
      state.authenticationCode = action.payload.authenticationCode;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logout: (state) => {
      state.email = null;
      state.password = null;
      state.isAuthenticated = false;
      state.authenticationCode = null;
      state.correctedPath = null;
      state.registerPath = null; 
      localStorage.removeItem('authState');
    },
    setCorrectedPath: (state, action: PayloadAction<{ correctedPath: string }>) => {
      state.correctedPath = action.payload.correctedPath;
      localStorage.setItem('authState', JSON.stringify(state));
    },
    setRegisterPath: (state, action: PayloadAction<{ registerPath: string }>) => {
      state.registerPath = action.payload.registerPath;
      localStorage.setItem('authState', JSON.stringify(state));
    },
  },
});

export const {
  startAuthentication,
  completeAuthentication,
  logout,
  setCorrectedPath,
  setRegisterPath,
} = authSlice.actions;
export default authSlice.reducer;
