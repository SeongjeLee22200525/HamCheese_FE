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

      <section className="w-full bg-[#F5F8F8] px-60 min-h-160">
        <main className="flex items-start py-15">
          {/* Left */}
          <div className="flex-[0.8] flex flex-col items-start gap-10">
            <img src="/images/ment.svg" alt="Ment" className="w-85 h-auto" />
            <img
              src="/images/slogan.svg"
              alt="Slogan"
              className="w-105 h-auto"
            />
            <Link
              href="/signin"
              className="w-80 px-2 py-5 bg-[#00C3CC] rounded inline-flex justify-center items-center gap-2.5 mt-10 text-[#F5F8F8] text-lg font-semibold hover:bg-[#0FA4AB]"
            >
              학교인증하고 회원가입하기
            </Link>
          </div>

          {/* Right */}
          <div className="flex-[1.2] flex flex-col items-center">
            <img
              src="/images/mainpage/feed.svg"
              alt="Feed image"
              className="w-full max-w-300 h-auto"
            />
          </div>
        </main>
      </section>

      {/* ================= PROFILE + RECRUITING (흰 배경 블럭) ================= */}

      <div className="w-full bg-white">
        <img
          src="/images/mainpage/center.svg"
          alt="Feed image"
          className="w-full h-auto mt-40"
        />
        <div className="flex justify-center mt-18">
          <Link
            href="/signin"
            className="w-80 px-2 py-5 bg-[#00C3CC] rounded inline-flex justify-center items-center gap-2.5 text-[#F5F8F8] text-lg font-semibold hover:bg-[#0FA4AB]"
          >
            학교인증하고 회원가입하기
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
