import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="w-full bg-zinc-100">
      {/* 여기부터 메인 콘텐츠 */}
      <Header />
    </main>
  );
}
