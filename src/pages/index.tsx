import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-zinc-100 flex flex-col items-center">
      <Header/>
    </div>
  );
}
