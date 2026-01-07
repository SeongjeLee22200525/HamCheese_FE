import { useState } from "react";
import { Recruiting } from "@/types/recruiting";

const PAGE_SIZE = 10;

export function useRecruitingPagination() {
  const [all, setAll] = useState<Recruiting[]>([]);
  const [visible, setVisible] = useState<Recruiting[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const init = (data: Recruiting[]) => {
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
