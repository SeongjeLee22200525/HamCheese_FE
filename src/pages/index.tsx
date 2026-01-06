"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { getFirstPage } from "@/api/home";
import { useRouter } from "next/router";



export default function Home() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [recruitings, setRecruitings] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFirstPage();
      setProfiles(data.profileFeedList);
      setRecruitings(data.recruitingFeedList);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F5F8F8]">
      <Header />

      <section className="w-full bg-[#F5F8F8] px-[240px] min-h-[640px]">
        <main className="flex items-center gap-40 py-15">
          {/* Left */}
          <div className="flex-1 flex flex-col items-start gap-10">
            <img src="/images/ment.svg" alt="Ment" className="w-70 h-auto" />
            <img
              src="/images/slogan.svg"
              alt="Slogan"
              className="w-140 h-auto"
            />
          </div>

          {/* Right */}
          <div className="flex-1 flex flex-col items-center gap-14 mt-2">
            <img
              src="/images/logo.svg"
              alt="MateCheck Logo"
              className="w-160 h-auto"
            />

            <div className="w-220 h-24 px-6 rounded-lg shadow-[0px_0px_10px_0px_rgba(225,237,240,1.00)] outline outline-2 outline-offset-[-2px] outline-[#00C3CC] flex items-center gap-4 bg-white">
              <input
                placeholder="원하는 메이트의 이름을 검색해보세요."
                className="flex-1 h-full px-1 outline-none text-[#838F91] leading-[96px] text-2xl font-medium
    placeholder:leading-[96px] placeholder:text-[#838F91] placeholder:text-2xl placeholder:font-medium "
              />
              <img
                src="/images/search-icon.svg"
                alt="search"
                className="w-7 h-7 cursor-pointer"
                onClick={() => router.push("/signin")}
              />
            </div>
          </div>
        </main>
      </section>

      {/* ================= PROFILE + RECRUITING (흰 배경 블럭) ================= */}
      <div className="w-full bg-white">
        {/* 공통 기준 컨테이너 */}
        <div className="w-full mx-auto px-[240px] py-40">
          {/* ================= PROFILE ================= */}
          <section className="mb-32">
            <div className="flex justify-between items-center mb-6 text-[#222829]">
              <div className="text-3xl font-light">메이트 프로필</div>
              <Link
                href="/signin"
                className="inline-flex items-center text-lg text-[#222829]"
              >
                더보기
                <img
                  src="/images/more.svg"
                  alt="arrow"
                  className="w-7 h-7 ml-1"
                />
              </Link>
            </div>

            <div className="flex gap-7">
              {profiles.slice(0, 4).map((p) => (
                <div
                  key={p.userId}
                  className="w-85 rounded-lg shadow-[0px_2px_4px_0px_rgba(225,237,240,1.00)] outline outline-1 outline-offset-[-1px] outline-[#CEDBDE] p-14 bg-white"
                >
                  {/* 상단: 사진 + 기본정보 */}
                  <div className="flex gap-4">
                    {/* 프로필 이미지 */}
                    <img
                      src={p.imageUrl || "/images/profile.svg"}
                      className="w-16 h-16 rounded-full object-cover"
                    />

                    {/* 이름 / 학번 / 전공 */}
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-lg text-[#222829]">
                        {p.name} <span className="font-medium">학부생</span>
                      </span>

                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="p-2 rounded bg-[#F5F8F8] text-[#838F91] font-semibold">
                          {p.studentId}학번
                        </span>

                        <span className="p-2 rounded bg-[#F5F8F8] text-[#0FA4AB] font-semibold">
                          {p.firstMajor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 자기소개 */}
                  <p className="text-base font-medium text-[#495456] line-clamp-2 mt-3">
                    {p.introduction}
                  </p>

                  {/* 키워드 */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {Array.isArray(p.skillList) &&
                      p.skillList.slice(0, 3).map((k: string) => (
                        <span
                          key={k}
                          className="text-sm px-3 py-2 rounded outline outline-offset-[-1px] outline-[#CEDBDE] inline-flex justify-center gap-2.5 text-[#838F91] font-medium"
                        >
                          #{k}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= RECRUITING ================= */}
          <section className="mb-32">
            <div className="flex justify-between items-center mb-6 text-[#222829]">
              <div className="text-3xl font-light">현재 모집 중인 팀플</div>
              <Link
                href="/signin"
                className="inline-flex items-center text-lg text-[#222829]"
              >
                더보기
                <img
                  src="/images/more.svg"
                  alt="arrow"
                  className="w-7 h-7 ml-1"
                />
              </Link>
            </div>

            <div className="flex gap-7">
              {recruitings.slice(0, 4).map((r) => (
                <div
                  key={r.recruitingId}
                  className="w-85 rounded-lg shadow-[0px_2px_4px_0px_rgba(225,237,240,1.00)] outline outline-1 outline-offset-[-1px] outline-[#CEDBDE] p-14 bg-white"
                >
                  <div className="flex flex-col gap-4">
                    <span className="inline-block w-fit px-3 py-2 text-sm font-bold text-[#0FA4AB] bg-[#F5F8F8] rounded gap-2 whitespace-nowrap">
                      모집인원 {r.recruitPeople}/{r.totalPeople}
                    </span>
                    <p className="flex items-center gap-2 text-sm mt-1 text-[#00C3CC] font-bold whitespace-nowrap">
                      <span>{r.projectType}</span>

                      <img
                        src="/images/Vector.svg"
                        alt="arrow"
                        className="w-3 h-3"
                      />

                      <span className="text-[#222829] font-medium">
                        {r.projectSpecific}
                      </span>

                      {r.classes !== 0 && (
                        <>
                          <span className="text-[#CEDBDE] font-medium">|</span>
                          <span className="text-[#222829] font-medium">
                            {r.classes}분반
                          </span>
                        </>
                      )}
                    </p>

                    <p className="self-stretch justify-start text-[#222829] text-lg font-bold">
                      {r.title}
                    </p>
                    <p className="self-stretch justify-start text-[#838F91] text-sm font-medium">
                      {r.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
