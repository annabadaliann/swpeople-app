import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { loginAction } from "./auth.thunk";

interface InitialState {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  errorMessage: string | null;
}

const initialState: InitialState = {
  isAuthenticated: false,
  isAuthLoading: false,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isAuthLoading: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.isAuthLoading = false;
    });
    builder.addCase(loginAction.pending, (state) => {
      state.isAuthLoading = true;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      notification.error({ message: action.error.message });
      state.isAuthLoading = false;
    });
  },
});
