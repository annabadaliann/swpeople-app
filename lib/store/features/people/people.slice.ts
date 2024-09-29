import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Person } from "@/lib/store/services/people/people.type";
import { notification } from "antd";
import { fetchPeople } from "./people.thunk";

interface PeopleState {
  people: Person[];
  totalCount: number;
  searchQuery: string;
  isLoading: boolean;
}

const getQueryParams = () => {
  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("search") || "";
  }
  return "";
};

const initialState: PeopleState = {
  people: [],
  totalCount: 0,
  searchQuery: getQueryParams(),
  isLoading: true,
};

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      return {
        ...state,
        searchQuery: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPeople.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchPeople.fulfilled,
      (state, action: PayloadAction<{ count: number; results: Person[] }>) => {
        state.totalCount = action.payload.count;
        state.people = action.payload.results;
        state.isLoading = false;
      }
    );
    builder.addCase(fetchPeople.rejected, (state, action) => {
      notification.error({ message: action.error.message });
      state.isLoading = false;
    });
  },
});

export const { setSearchQuery } = peopleSlice.actions;
