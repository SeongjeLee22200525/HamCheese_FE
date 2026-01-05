"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { useUserStore } from "@/stores/useUserStore";
import RecruitPostCard from "./RecruitPostCard";
import { Recruiting } from "@/types/recruiting";
import { useRouter } from "next/router";

const PAGE_SIZE = 5; // 게시글 개수
const PAGE_GROUP_SIZE = 5; // 페이지 버튼 개수

export default function MyPosts() {
  const myId = useUserStore((state) => state.user?.myId);
  const router = useRouter();

  const [posts, setPosts] = useState<Recruiting[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!myId) return;

    const fetchMyPosts = async () => {
      try {
        const res = await axios.get<Recruiting[]>(`/recruiting/${myId}`);
        setPosts(res.data);
      } catch (e) {
        console.error("❌ my recruiting fetch error", e);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [myId]);

  if (loading) {
    return (
      <div className="p-10 text-sm text-[#9CA3AF]">
        내가 작성한 모집글을 불러오는 중입니다...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="p-10 text-sm text-[#9CA3AF]">
        아직 작성한 모집글이 없습니다.
      </div>
    );
  }

  /* ================= pagination 계산 ================= */

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  const pagedPosts = posts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div>
      {/* 모집글 리스트 */}
      {pagedPosts.map((post) => (
        <RecruitPostCard
          key={post.recruitingId}
          item={post}
          onClick={(id) => router.push(`/recruitmate/${id}`)}
        />
      ))}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-15">
          {/* ◀ 이전 그룹 */}
          {startPage > 1 && (
            <button
              onClick={() => setCurrentPage(startPage - 1)}
              className="
                w-8 h-8 flex items-center justify-center
                hover:bg-[#F5F8F8] active:bg-[#E1EDF0] rounded
              "
            >
              <img src="/images/arrow-left.svg" className="w-4 h-4" />
            </button>
          )}

          {/* 페이지 번호 */}
          {pageNumbers.map((page) => {
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  w-7.5 h-8.25 rounded text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-[#E1EDF0] text-[#838F91]"
                      : "text-[#838F91] hover:bg-[#F5F8F8] active:bg-[#E1EDF0]"
                  }
                `}
              >
                {page}
              </button>
            );
          })}

          {/* ▶ 다음 그룹 */}
          {endPage < totalPages && (
            <button
              onClick={() => setCurrentPage(endPage + 1)}
              className="
                w-8 h-8 flex items-center justify-center
                hover:bg-[#F5F8F8] active:bg-[#E1EDF0] rounded
              "
            >
              <img src="/images/arrow-right.svg" className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
