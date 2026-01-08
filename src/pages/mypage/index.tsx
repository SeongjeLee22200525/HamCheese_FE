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
  const myId = useUserStore((state) => state.user?.myId);

  const [profile, setProfile] = useState<MateProfileInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await axios.get<MateProfileInfo>(`/user/myProfile/${myId}`);
        setProfile(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProfile();
  }, [myId, router]);

  if (loading || !profile) return null;

  return (
    <MyPageLayout profile={profile}>
      <MyPageTabs />
      <MyInfo profile={profile} setProfile={setProfile} />
    </MyPageLayout>
  );
}
