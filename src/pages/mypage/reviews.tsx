"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MyPageLayout from "@/components/mypage/MyPageLayout";
import MyPageTabs from "@/components/mypage/MyPageTabs";
import MyReviews from "@/components/mypage/MyReviews";

import { useUserStore } from "@/stores/useUserStore";
import axios from "@/api/axios";
import { MateProfileInfo } from "@/types/user";

type MyPeerReviewResponse = {
  peerGoodKeyword: Record<string, number>;
  goodKeywordCount: number;
  peerBadKeyword: Record<string, number>;
  badKeywordCount: number;
  peerReviewRecent: {
    startDate: string;
    meetSpecific: string;
    goodKeywordList: string[];
    badKeywordList: string[];
  }[];
};

export default function MyReviewPage() {
  const router = useRouter();
  const myId = useUserStore((state) => state.user?.myId);

  const [profile, setProfile] = useState<MateProfileInfo | null>(null);
  const [review, setReview] = useState<MyPeerReviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, hydrated } = useUserStore();

  useEffect(() => {
    if (!hydrated) return;

    // 🔥 hydration 끝났는데 로그인 안 돼 있으면
    if (!myId) {
      router.replace("/signin");
      return;
    }
    const fetchData = async () => {
      try {
        const [profileRes, reviewRes] = await Promise.all([
          axios.get<MateProfileInfo>(`/user/myProfile/${myId}`),
          axios.get<MyPeerReviewResponse>(`/user/myPeerReview/${myId}`),
        ]);

        setProfile(profileRes.data);
        setReview(reviewRes.data);
      } catch (e) {
        console.error("❌ my review fetch error", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [myId, router]);

  /* =========================
   * 로딩 처리
   * ========================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-[#9CA3AF]">
        프로필을 불러오는 중입니다...
      </div>
    );
  }

  if (!profile || !review) return null;

  return (
    <MyPageLayout profile={profile}>
      {/* ===== 탭 영역 (index와 동일) ===== */}
      <div className="z-10">
        <MyPageTabs />
      </div>

      {/* ===== 콘텐츠 영역 ===== */}
      <div>
        <MyReviews
          name={profile.name}
          peerGoodKeyword={review.peerGoodKeyword}
          goodKeywordCount={review.goodKeywordCount}
          peerBadKeyword={review.peerBadKeyword}
          badKeywordCount={review.badKeywordCount}
          peerReviewRecent={review.peerReviewRecent}
        />
      </div>
    </MyPageLayout>
  );
}
