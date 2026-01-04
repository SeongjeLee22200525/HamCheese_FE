import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

import axios from "@/api/axios";
import { Recruiting } from "@/types/recruiting";

export default function RecruitMateDetail() {
  const router = useRouter();
  const { recruitingId } = router.query;

  const [recruiting, setRecruiting] = useState<Recruiting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recruitingId) return;

    const fetchDetail = async () => {
      try {
        const res = await axios.get<Recruiting>(
          `/recruiting/${recruitingId}`
        );
        setRecruiting(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [recruitingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center text-[#9AA4A6]">
          로딩 중...
        </main>
        <Footer />
      </div>
    );
  }

  if (!recruiting) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center text-[#9AA4A6]">
          존재하지 않는 모집글입니다.
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-[1000px] mx-auto px-10 py-12">
          <div className="border border-[#E6EEF0] rounded-xl px-10 py-8 bg-white">
            <div className="flex items-center gap-3 text-sm text-[#6B7280] mb-4">
              <span className="px-3 py-1 rounded bg-[#EEF7F8] text-[#0FA4AB] font-semibold">
                모집인원 {recruiting.recruitPeople} /{" "}
                {recruiting.totalPeople}
              </span>

              <span className="text-[#00AEB5] font-semibold">
                {recruiting.projectType}
              </span>

              <img
                src="/images/Vector.svg"
                alt="arrow"
                className="w-3 h-3"
              />

              <span>
                {recruiting.projectSpecific}{" "}
                {recruiting.classes}분반
              </span>

              <img
                src="/images/Vector.svg"
                alt="arrow"
                className="w-3 h-3"
              />

              <span>
                <span className="font-bold text-[#222829]">
                  주제
                </span>
                <span className="mx-1 text-[#B7C4C7]">|</span>
                <span className="text-[#222829]">
                  {recruiting.topic}
                </span>
              </span>
            </div>

            <h1 className="text-2xl font-extrabold text-[#111827] mb-6">
              {recruiting.title}
            </h1>

            <div className="flex items-center justify-between mb-10">
              <div className="text-base font-medium text-[#222829]">
                {recruiting.name} 학부생
              </div>

              <div className="flex gap-2">
                {recruiting.skillList.map(skill => (
                  <span
                    key={skill}
                    className="
                      px-2 py-1
                      text-xs
                      rounded
                      border
                      border-[#E5E7EB]
                      text-[#838F91]
                    "
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#F9FAFB] rounded-lg px-6 py-6 text-sm text-[#374151] leading-relaxed">
              모집 상세 설명이 들어갈 영역입니다.
            </div>

            <div className="flex justify-end mt-10">
              <button
                className="
                  w-48 h-14
                  rounded
                  bg-[#6EC6CC]
                  text-white
                  font-extrabold
                "
              >
                참여 문의하기
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
