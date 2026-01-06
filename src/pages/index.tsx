"use client";

import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { getFirstPage } from "@/api/home";

export default function Home() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [recruitings, setRecruitings] = useState<any[]>([]);

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
              <button className="text-lg text-[#222829]">
                더보기
                <img
                  src="/images/more.svg"
                  alt="arrow"
                  className="w-7 h-7 ml-1 inline-block"
                />
              </button>
            </div>

            <div className="flex gap-7">
              {profiles.slice(0, 4).map((p) => (
                <div
                  key={p.userId}
                  className="w-80 rounded-lg shadow-[0px_2px_4px_0px_rgba(225,237,240,1.00)] outline outline-1 outline-offset-[-1px] outline-[#CEDBDE] p-12 bg-white"
                >
                  <img
                    src={p.imageUrl || "/images/profile.svg"}
                    className="w-18 h-18 rounded-full mb-3"
                  />

                  <p className="font-bold text-lg text-[#222829]">{p.name} 학생</p>
                  <p className="p-2 rounded bg-[#F5F8F8] text-[#838F91] font-semibold">{p.firstMajor}</p>
                  <p className="text-xs line-clamp-2">{p.introduction}</p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {Array.isArray(p.peerGoodKeywords) &&
                      p.peerGoodKeywords.slice(0, 4).map((k: string) => (
                        <span
                          key={k}
                          className="text-[10px] px-2 py-1 bg-[#EEF7F8] text-[#0FA4AB] rounded"
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
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold">현재 모집중인 팀플</h2>
              <button className="text-sm text-gray-400">더보기 →</button>
            </div>

            <div className="flex gap-6">
              {recruitings.slice(0, 4).map((r) => (
                <div
                  key={r.recruitingId}
                  className="w-[260px] border rounded-xl p-4 bg-white"
                >
                  <span className="text-xs text-[#00AEB5] font-semibold">
                    모집중 {r.recruitPeople}/{r.totalPeople}
                  </span>

                  <p className="font-bold text-sm mt-2 line-clamp-2">
                    {r.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{r.projectType}</p>
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
