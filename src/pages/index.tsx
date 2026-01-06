// "use client";

// import { useEffect, useState } from "react";
// import Header from "@/components/common/Header";
// import Footer from "@/components/common/Footer";
// import { getFirstPage } from "@/api/home";

// export default function Home() {
//   const [profiles, setProfiles] = useState<any[]>([]);
//   const [recruitings, setRecruitings] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       // const data = await getFirstPage();
//       setProfiles(data.profileFeedList);
//       setRecruitings(data.recruitingFeedList);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="w-full min-h-screen flex flex-col bg-white">
//       <Header />

//       {/* ================= HERO (회색 배경) ================= */}
//       <section className="w-full bg-[#F5F8F8] px-[200px] min-h-[900px]">
//         <main className="flex-1 w-full max-w-[1600px] mx-auto px-16 flex items-center gap-40 py-48">
//           {/* Left */}
//           <div className="flex-1 flex flex-col items-start gap-6 -ml-16">
//             <img
//               src="/images/ment.svg"
//               alt="Ment"
//               className="w-[340px] h-auto"
//             />
//             <img
//               src="/images/slogan.svg"
//               alt="Slogan"
//               className="w-[340px] h-auto"
//             />
//           </div>

//           {/* Right */}
//           <div className="flex-1 flex flex-col items-center gap-8 mt-2">
//             <img
//               src="/images/logo.svg"
//               alt="MateCheck Logo"
//               className="w-220 h-auto"
//             />

//             <div className="w-260 h-24 px-6 border border-[#6EC6CC] rounded-xl flex items-center gap-4 bg-white">
//               <input
//                 placeholder="원하는 메이트의 이름을 검색해보세요."
//                 className="flex-1 text-[16px] outline-none text-[#222729] placeholder:text-[#B7C4C7] placeholder:text-xl"
//               />
//               <img
//                 src="/images/search-icon.svg"
//                 alt="search"
//                 className="w-7 h-7 cursor-pointer"
//               />
//             </div>
//           </div>
//         </main>
//       </section>

//       {/* ================= PROFILE (흰 배경) ================= */}
//       <section className="w-full mt-32 bg-white">
//         <div className="max-w-7xl mx-auto px-16">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="font-bold">메이트 프로필</h2>
//             <button className="text-sm text-gray-400">더보기 →</button>
//           </div>

//           <div className="flex gap-6">
//             {profiles.slice(0, 4).map((p) => (
//               <div
//                 key={p.userId}
//                 className="w-[260px] border rounded-xl p-4 bg-white"
//               >
//                 <img
//                   src={p.imageUrl || "/images/profile.svg"}
//                   className="w-12 h-12 rounded-full mb-3"
//                 />

//                 <p className="font-bold text-sm">{p.name} 학생</p>
//                 <p className="text-xs text-gray-400 mb-2">
//                   {p.firstMajor}
//                 </p>
//                 <p className="text-xs line-clamp-2">
//                   {p.introduction}
//                 </p>

//                 <div className="flex flex-wrap gap-1 mt-3">
//                   {p.peerGoodKeywords?.slice(0, 3).map((k: string) => (
//                     <span
//                       key={k}
//                       className="text-[10px] px-2 py-1 bg-[#EEF7F8] text-[#0FA4AB] rounded"
//                     >
//                       #{k}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= RECRUITING (흰 배경) ================= */}
//       <section className="w-full mt-32 mb-40 bg-white">
//         <div className="max-w-7xl mx-auto px-16">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="font-bold">현재 모집중인 팀플</h2>
//             <button className="text-sm text-gray-400">더보기 →</button>
//           </div>

//           <div className="flex gap-6">
//             {recruitings.slice(0, 4).map((r) => (
//               <div
//                 key={r.recruitingId}
//                 className="w-[260px] border rounded-xl p-4 bg-white"
//               >
//                 <span className="text-xs text-[#00AEB5] font-semibold">
//                   모집중 {r.recruitPeople}/{r.totalPeople}
//                 </span>

//                 <p className="font-bold text-sm mt-2 line-clamp-2">
//                   {r.title}
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   {r.projectType}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }
