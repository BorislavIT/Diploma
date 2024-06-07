import { Mp3Type } from "@/pages/mp3";
import { ENDPOINTS } from "@/shared/constants";
import { useShopQuery } from "@/shared/queries";
import { useEffect, useState } from "react";

export type Mp3File = {
  accountId: number;
  author: string;
  id: number;
  mp3Type: Mp3Type;
  name: string;
  price: number;
  imageUrl: string;
};

const useMp3s = (selectedCategory: number | null, search: string) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data, error, isLoading } = useShopQuery<Mp3File[]>(
    ["getAllMp3s", global.isAuthorized, selectedCategory, debouncedSearch],
    `${ENDPOINTS.MP3S.PATH}`,
    true,
    selectedCategory !== null || debouncedSearch !== ""
      ? {
          params: {
            Mp3Type: selectedCategory,
            Search: debouncedSearch,
          },
        }
      : {}
  );

  return { data, error, isLoading };
};

export default useMp3s;
