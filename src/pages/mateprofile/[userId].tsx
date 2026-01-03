"use client";

import { useRouter } from "next/router";
import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

import Profile from "@/components/mateprofile/Profile";
import ProfileSection from "@/components/mateprofile/ProfileSection";
import PeerReview from "@/components/mateprofile/PeerReview";
import PeerReviewModal from "@/components/mateprofile/peerReviewModal/PeerReviewModal";

import { mockMateProfile } from "@/mocks/mateProfile";
import { MetaTag } from "@/types/user";
import ReviewSuccessSnackbar from "@/components/mateprofile/peerReviewModal/ReviewSuccessSnackbar";

export default function MateProfilePage() {
  const router = useRouter();
  const { userId } = router.query;
  if (typeof userId !== "string") return null;

  const targetUserId = Number(userId);
  const data = mockMateProfile;

  //동료평가 모달 상태 관리
  const [isPeerReviewOpen, setIsPeerReviewOpen] = useState(false);

  const targetMetaTags: MetaTag[] = [
    { type: "studentId", value: data.profile.studentId },
    { type: "major", value: data.profile.firstMajor },
  ];
  //동료평가 완료 스낵바용 상태관리
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  if (data.profile.secondMajor) {
    targetMetaTags.push({
      type: "major",
      value: data.profile.secondMajor,
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8F8]">
      <Header />

      <main className="flex pt-5">
        {/* ===== LEFT : 프로필 카드 ===== */}
        <div className="pl-50">
          <Profile
            profile={data.profile}
            onGivePiece={() => console.log("조각 건네기")}
            onPeerReview={() => setIsPeerReviewOpen(true)}
          />
        </div>
        {isPeerReviewOpen && (
          <PeerReviewModal
            targetName={data.profile.name}
            targetImageUrl={data.profile.imageUrl}
            targetMetaTags={targetMetaTags}
            onClose={() => setIsPeerReviewOpen(false)}
            onSubmit={(payload) => {
              console.log("submit", payload);
              setIsPeerReviewOpen(false);
              setShowReviewSuccess(true);
            }}
          />
        )}
        {showReviewSuccess && (
          <ReviewSuccessSnackbar onClose={() => setShowReviewSuccess(false)} />
        )}

        {/* ===== RIGHT : 콘텐츠 ===== */}
        <section className="flex-col space-y-14.5 pl-10 w-full pr-49 pt-10">
          <ProfileSection tabTitle="자기소개">
            {/* 소제목: 자기소개 */}
            <div className="py-17 px-20">
              <div className="flex h-16 mb-10 ">
                <span className="w-1.5 h-5 bg-[#00C3CC] mt-[5px]" />
                <div className=" pl-5 font-extrabold text-xl w-45 text-[#495456]">
                  자기소개
                </div>
                <p className="pl-11 text-xl text-[#222829]">
                  {data.introduction}
                </p>
              </div>

              {/* 소제목: 강점 해시태그 */}
              <div className="flex ">
                <span className="w-1 h-5 bg-[#00C3CC] mt-[5px]" />
                <div className="pl-5 font-extrabold text-xl w-41.5 text-[#495456]">
                  강점 해시태그
                </div>

                <div className="flex gap-2.5">
                  {data.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 border border-[#CEDBDE] rounded font-medium text-sm text-[#838F91]"
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ProfileSection>

          <ProfileSection tabTitle="활동내역">
            <ul className="space-y-4 text-xl text-[#222829] py-17 px-20">
              {data.activities.map((item) => (
                <li key={item.title} className="flex items-center">
                  <span className="text-[#222829] font-extrabold w-12">
                    {item.year}
                  </span>

                  <span className="font-normal ml-7">{item.title}</span>

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pl-4 font-medium text-base mt-0.5 cursor-pointer"
                    >
                      <span className="hover:underline">바로가기</span>
                      <span className="ml-1">🔗</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </ProfileSection>

          {/* 동료평가 */}
          <div className="pb-30">
            <PeerReview
              name={data.profile.name}
              peerGoodKeyword={data.peerReview.peerGoodKeyword}
              goodKeywordCount={data.peerReview.goodKeywordCount}
              peerBadKeyword={data.peerReview.peerBadKeyword}
              badKeywordCount={data.peerReview.badKeywordCount}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
