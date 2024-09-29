import { configureStore } from '@reduxjs/toolkit';
import { peopleSlice } from './features/people/people.slice';
import { authSlice } from './features/auth/auth.slice'
export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [peopleSlice.name]: peopleSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch