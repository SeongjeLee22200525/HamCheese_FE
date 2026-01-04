"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MyPageLayout from "@/components/mypage/MyPageLayout";
import MyPageTabs from "@/components/mypage/MyPageTabs";
import MyInfo from "@/components/mypage/MyInfo";
import { useUserStore } from "@/stores/useUserStore";
import axios from "@/api/axios";
import { MateProfileInfo } from "@/types/user";

export default function MyPage() {
  const router = useRouter();
  const myId = useUserStore((state) => state.user?.myId);

  const [profile, setProfile] = useState<MateProfileInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!myId) {
      router.replace("/signin");
      return;
    }

    const fetchMyProfile = async () => {
      try {
        const res = await axios.get<MateProfileInfo>(`/user/myProfile/${myId}`);
        setProfile(res.data);
      } catch (e) {
        console.error("❌ myProfile fetch error", e);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProfile();
  }, [myId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-400">
        프로필을 불러오는 중입니다...
      </div>
    );
  }

  if (!profile) return null;

  return (
    <MyPageLayout profile={profile}>
      {/* 🔥 탭 영역 (완전 분리) */}
      <div className=" z-10">
        <MyPageTabs />
      </div>

      {/* 🔥 콘텐츠 박스 (완전 분리) */}
      <div className=" rounded-lg "></div>
    </MyPageLayout>
  );
}
