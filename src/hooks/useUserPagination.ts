import { useState } from "react";
import { UserProfile } from "@/types/user";

const PAGE_SIZE = 10;

export function useUserPagination() {
  const [all, setAll] = useState<UserProfile[]>([]);
  const [visible, setVisible] = useState<UserProfile[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const init = (data: UserProfile[]) => {
    setAll(data);
    setVisible(data.slice(0, PAGE_SIZE));
    setPage(1);
    setHasMore(data.length > PAGE_SIZE);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const next = all.slice(0, nextPage * PAGE_SIZE);

    setVisible(next);
    setPage(nextPage);

    if (next.length >= all.length) {
      setHasMore(false);
    }
  };

  return {
    items: visible,
    hasMore,
    init,
    loadMore,
  };
}
