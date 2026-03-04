import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:8000/api/v1/users";
axios.defaults.withCredentials = true;

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        name,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error signing up"
      );
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      console.log("LOGIN API RESPONSE:", response.data);
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error logging in"
      );
    }
  }
);
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error logging out");
    }
  }
);
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error verifying email"
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Not authenticated"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk("auth/forgotPassword",
  async(email , {rejectWithValue})=>{
    try {
      const response = await axios.post(`${API_URL}/forgot-password`,{email})
      return response.data.message
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error sending reset link")
    }
  }
)
export const resetPassword = createAsyncThunk('auth/resetPassword',
  async({token,password},{rejectWithValue})=>{
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`,{password})
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error resetting password")
    }
  }
)

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
         state.isLoading = true
         state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false
          state.isAuthenticated = true
          state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false
          state.isAuthenticated = true
          state.user = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false 
        state.error = action.payload;
      })

      

      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(forgotPassword.pending,(state)=>{
        state.isLoading = true
        state.error=null
      })
      .addCase(forgotPassword.fulfilled,(state)=>{
        state.isLoading=false
      })
      .addCase(forgotPassword.rejected , (state,action)=>{
        state.isLoading=false
        state.error=action.payload
      })

      .addCase(resetPassword.pending , (state)=>{
        state.isLoading=true
        state.error=null
      })
      .addCase(resetPassword.fulfilled , (state)=>{
        state.isLoading=false
      })
      .addCase(resetPassword.rejected , (state,action)=>{
        state.isLoading=false
        state.error=action.payload
      })
  },
});
export const { clearError } = authSlice.actions;

export default authSlice.reducer;
