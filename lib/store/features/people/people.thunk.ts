import { createAsyncThunk } from "@reduxjs/toolkit";
import PeopleService from "../../services/people/people.service";

export const fetchPeople = createAsyncThunk(
  "people/fetchPeople",
  async ({
    query = "",
    page = 1,
  }: {
    query?: string | null;
    page?: number | null;
  }) => {
    try {
      const response = await PeopleService.getPeople({ searchTerm: query, page });
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }
);
