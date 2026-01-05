"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { useUserStore } from "@/stores/useUserStore";
import RecruitPostCard from "./RecruitPostCard";
import { Recruiting } from "@/types/recruiting";
import { useRouter } from "next/router";

export default function MyPosts() {
  const myId = useUserStore((state) => state.user?.myId);
  const router = useRouter();
  const [posts, setPosts] = useState<Recruiting[]>([]);
  const [loading, setLoading] = useState(true);

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
  console.log("🔥 post:", posts);

  return (
    <div>
      {posts.map((post) => (
        <RecruitPostCard
          key={post.recruitingId}
          item={post}
          onClick={(id) => router.push(`/recruitmate/${id}`)}
        />
      ))}
    </div>
  );
}
