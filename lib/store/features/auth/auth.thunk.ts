import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth/auth.service";
import { Credentials } from "../../services/auth/auth.type";
import { authSlice } from "./auth.slice";

export const loginAction = createAsyncThunk(
  "people/login",
  async (
    { credentials, cb }: { credentials: Credentials; cb: () => void },
    thunkApi
  ) => {
    try {
      thunkApi.dispatch(authSlice.actions.setAuthLoading(true));
      await AuthService.login(credentials);
      if (cb) {
        cb();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("An unknown error occurred.");
      }
    } finally {
      thunkApi.dispatch(authSlice.actions.setAuthLoading(false));
    }
  }
);
