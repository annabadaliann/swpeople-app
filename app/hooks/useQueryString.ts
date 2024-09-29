import { useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type QueryParams = { [key: string]: string | undefined };

const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (newParams: QueryParams) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.keys(newParams).forEach((key) => {
        const value = newParams[key];
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  const handleQueryChange = (newParams: QueryParams) => {
    router.push(`${pathname}?${createQueryString(newParams)}`);
  };

  return handleQueryChange;
};

export default useQueryString;
