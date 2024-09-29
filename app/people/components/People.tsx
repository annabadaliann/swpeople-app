import { FC, useEffect, useState } from "react";
import { Pagination, Skeleton, Space } from "antd";
import { useSearchParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import useQueryString from "@/app/hooks/useQueryString";
import { Person } from "@/lib/store/services/people/people.type";

import { fetchPeople } from "@/lib/store/features/people/people.thunk";
import PersonItem from "./PersonItem";

const PAGE_SIZE = 10;
const INITIAL_PAGE = 1;

const SKELETON_ITEMS = Array.from({ length: 10 });

const People: FC = () => {
  const params = useSearchParams();

  const page = Number(params.get("page"));
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const { totalCount, searchQuery, isLoading, people } = useAppSelector(
    (state) => state.people
  );
  const dispatch = useAppDispatch();

  const handleQueryChange = useQueryString();

  useEffect(() => {
    if (page) {
      setCurrentPage(page);
      return;
    }
    if (searchQuery) {
      setCurrentPage(INITIAL_PAGE);
    }
  }, [searchQuery, page]);

  const onChange = (page: number) => {
    setCurrentPage(page);
    handleQueryChange({ page: String(page), search: searchQuery });
    dispatch(fetchPeople({ query: searchQuery, page }));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {isLoading ? (
          SKELETON_ITEMS.map((_, index) => (
            <div key={index} className="mb-4">
              <Skeleton
                className="border border-gray-300 rounded-lg p-4"
                style={{ height: "220px" }}
              />
            </div>
          ))
        ) : people && people.length > 0 ? (
          people.map((person: Person) => (
            <PersonItem person={person} key={person.id} />
          ))
        ) : (
          <p className="text-gray-500">People not found</p>
        )}
      </div>
      {totalCount > PAGE_SIZE && (
        <Space className="justify-end mt-5 w-full">
          <Pagination
            current={currentPage}
            onChange={onChange}
            total={totalCount}
            showSizeChanger={false}
          />
        </Space>
      )}
    </>
  );
};

export default People;
