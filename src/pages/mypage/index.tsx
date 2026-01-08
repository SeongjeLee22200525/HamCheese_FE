"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MyPageLayout from "@/components/mypage/MyPageLayout";
import MyPageTabs from "@/components/mypage/MyPageTabs";
import MyInfo from "@/components/mypage/MyInfo";
import axios from "@/api/axios";
import { useUserStore } from "@/stores/useUserStore";
import { MateProfileInfo } from "@/types/user";

export default function MyPage() {
  const router = useRouter();
  const { user, hydrated } = useUserStore();
  const myId = user?.myId;

  const [profile, setProfile] = useState<MateProfileInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 아직 복구 중이면 아무 것도 하지 마
    if (!hydrated) return;

    // 🔥 복구 끝났는데 로그인 안 돼 있으면
    if (!myId) {
      router.replace("/signin");
      return;
    }

    const fetchMyProfile = async () => {
      try {
        const res = await axios.get<MateProfileInfo>(`/user/myProfile/${myId}`);
        setProfile(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProfile();
  }, [hydrated, myId, router]);

  if (!hydrated || loading || !profile) return null;

  return (
    <MyPageLayout profile={profile}>
      <MyPageTabs />
      <MyInfo profile={profile} setProfile={setProfile} />
    </MyPageLayout>
  );
}
