"use client";
import { FC, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { fetchPeople } from "@/lib/store/features/people/people.thunk";
import SearchField from "./components/SearchField";
import PeopleList from "./components/People";

const PeopleListContainer: FC = () => {
  const dispatch = useAppDispatch();

  const params = useSearchParams();

  useEffect(() => {
    const pageQuery = params.get("page") as string;
    const searchQuery = params.get("search") as string;

    const data = {
      page: pageQuery ? Number(pageQuery) : 1,
      query: searchQuery || "",
    };

    dispatch(fetchPeople(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">People List</h2>
        <SearchField />
        <PeopleList />
      </div>
    </div>
  );
};

export default PeopleListContainer;
