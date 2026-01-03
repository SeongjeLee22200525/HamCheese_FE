"use client";

import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

import Profile from "@/components/mateprofile/Profile";
import ProfileSection from "@/components/mateprofile/ProfileSection";
import PeerReview from "@/components/mateprofile/PeerReview";
import PeerReviewModal from "@/components/mateprofile/peerReviewModal/PeerReviewModal";
import ReviewSuccessSnackbar from "@/components/mateprofile/peerReviewModal/ReviewSuccessSnackbar";

import { MetaTag } from "@/types/user";
import { checkUserEqual, getMateProfile } from "@/api/profile";
import { useUserStore } from "@/stores/useUserStore";

export default function MateProfilePage() {
  const router = useRouter();
  const { userId } = router.query;

  const myId = useUserStore((state) => state.user?.myId);

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [isPeerReviewOpen, setIsPeerReviewOpen] = useState(false);
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  /* =========================
   * 프로필 조회
   * ========================= */
  useEffect(() => {
    if (typeof userId !== "string") return;
    if (!myId) return;

    const targetUserId = Number(userId);

    const fetchProfile = async () => {
      try {
        setLoading(true);

        const isMine = await checkUserEqual(myId, targetUserId);
        if (isMine) {
          router.replace("/mypage");
          return;
        }

        const data = await getMateProfile(targetUserId);
        setProfile(data);
      } catch (e) {
        console.error("메이트 프로필 조회 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [myId, userId, router]);

  /* =========================
   * 메타 태그
   * ========================= */
  const targetMetaTags: MetaTag[] = useMemo(() => {
    if (!profile) return [];

    const tags: MetaTag[] = [
      { type: "studentId", value: profile.studentId },
      { type: "major", value: profile.firstMajor },
    ];

    if (profile.secondMajor) {
      tags.push({ type: "major", value: profile.secondMajor });
    }

    return tags;
  }, [profile]);

  /* =========================
   * 로딩 처리
   * ========================= */
  if (loading || !profile) {
    return null; // 필요하면 Skeleton으로 교체
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8F8]">
      <Header />

      <main className="flex pt-5">
        {/* ===== LEFT ===== */}
        <div className="pl-50">
          <Profile
            profile={profile}
            onGivePiece={() => console.log("조각 건네기")}
            onPeerReview={() => setIsPeerReviewOpen(true)}
          />
        </div>

        {/* ===== 동료평가 모달 ===== */}
        {isPeerReviewOpen && (
          <PeerReviewModal
            targetName={profile.name}
            targetImageUrl={profile.imageUrl}
            targetMetaTags={targetMetaTags}
            onClose={() => setIsPeerReviewOpen(false)}
            onSubmit={async (payload) => {
              console.log("peer review submit", payload);

              setIsPeerReviewOpen(false);
              setShowReviewSuccess(true);

              // 🔥 반드시 userId로 재조회
              const refreshed = await getMateProfile(Number(userId));
              setProfile(refreshed);
            }}
          />
        )}

        {/* ===== 성공 스낵바 ===== */}
        {showReviewSuccess && (
          <ReviewSuccessSnackbar onClose={() => setShowReviewSuccess(false)} />
        )}

        {/* ===== RIGHT ===== */}
        <section className="flex-col space-y-14.5 pl-10 w-full pr-49 pt-10">
          {/* 자기소개 */}
          <ProfileSection tabTitle="자기소개">
            <div className="py-17 px-20">
              <div className="flex h-16 mb-10">
                <span className="w-1 h-5 bg-[#00C3CC] mt-[5px]" />
                <div className="pl-5 font-extrabold text-xl w-30 text-[#495456]">
                  자기소개
                </div>
                <p className="pl-10 text-xl text-[#222829]">
                  {profile.introduction}
                </p>
              </div>

              {/* 강점 태그 */}
              <div className="flex">
                <span className="w-1 h-5 bg-[#00C3CC] mt-[5px]" />
                <div className="pl-5 font-extrabold text-xl w-40 text-[#495456]">
                  강점 해시태그
                </div>

                <div className="flex gap-2.5 flex-wrap">
                  {profile.skillList.length === 0 ? (
                    <span className="text-sm text-[#838F91]">
                      아직 등록된 강점 태그가 없습니다.
                    </span>
                  ) : (
                    profile.skillList.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 border border-[#CEDBDE] rounded font-medium text-sm text-[#838F91]"
                      >
                        #{skill}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </ProfileSection>

          {/* 활동내역 */}
          <ProfileSection tabTitle="활동내역">
            <ul className="space-y-4 text-xl text-[#222829] py-17 px-20">
              {profile.activity.length === 0 && (
                <p className="text-sm text-[#838F91]">
                  아직 활동 내역이 없습니다.
                </p>
              )}

              {profile.activity.map((item: any) => (
                <li
                  key={`${item.year}-${item.title}`}
                  className="flex items-center"
                >
                  <span className="font-extrabold w-12">{item.year}</span>
                  <span className="font-normal ml-7">{item.title}</span>

                  {item.link && item.link.trim() !== "" && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pl-4 font-medium text-base mt-0.5"
                    >
                      <span className="hover:underline">바로가기</span> 🔗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </ProfileSection>

          {/* 동료평가 */}
          <div className="pb-30">
            <PeerReview
              name={profile.name}
              peerGoodKeyword={profile.peerGoodKeyword}
              goodKeywordCount={profile.goodKeywordCount}
              peerBadKeyword={profile.peerBadKeyword}
              badKeywordCount={profile.badKeywordCount}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
