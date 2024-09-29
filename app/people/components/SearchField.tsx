"use client";
import { FC, useCallback } from "react";
import { Input } from "antd";
import { useAppDispatch } from "@/lib/hooks";
import { setSearchQuery } from "@/lib/store/features/people/people.slice";
import { useDebouncedCallback } from "@/app/hooks/useDebounce";
import useQueryString from "@/app/hooks/useQueryString";
import { fetchPeople } from "@/lib/store/features/people/people.thunk";
import { useSearchParams } from "next/navigation";

const SearchField: FC = () => {
  const dispatch = useAppDispatch();
  const params = useSearchParams();

  const searchQuery = params.get("search") || "";

  const handleQueryChange = useQueryString();

  const handleSearch = useCallback((query: string) => {
    handleQueryChange({ page: String(1), search: query });
    dispatch(setSearchQuery(query));
    dispatch(fetchPeople({ query }));
  }, []);

  const debounceCallback = useDebouncedCallback(handleSearch, searchQuery);

  return (
    <Input
      defaultValue={searchQuery}
      placeholder="Search..."
      className="h-10 md:!w-[500px]"
      onChange={debounceCallback}
    />
  );
};

export default SearchField;
