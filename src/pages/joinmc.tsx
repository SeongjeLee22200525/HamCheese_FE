"use client";
import { useRef, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function JoinMC() {
  const departments = [
    "글로벌리더십학부",
    "경영경제학부",
    "공간환경시스템공학부",
    "국제어문학부",
    "기계제어학부",
    "법학부",
    "커뮤니케이션학부",
    "생명과학부",
    "콘텐츠융합디자인학부",
    "AI융합학부",
    "전산전자공학부",
    "상담심리사회복지학부",
  ];

  const [deptOpen, setDeptOpen] = useState(false);
  const [department, setDepartment] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="w-full flex justify-center">
          <div className="w-[920px]">
            {/* 제목 */}
            <h1 className="text-[32px] font-light text-[#222829] mb-5">
              회원가입하기
            </h1>

            {/* 카드 */}
            <div className="bg-[#F5F8F8] rounded-lg px-20 py-17">
              {/* ================= 프로필 이미지 ================= */}
              <div className="mb-14">
                <div className="flex items-start">
                  {/* 라벨 (160px 기준) */}
                  <div className="w-[160px] flex items-center gap-2 text-sm font-medium text-[#222829] mt-2">
                    <div className="w-1 h-4 bg-[#00C3CC]" />
                    프로필 이미지
                  </div>

                  {/* 이미지 + 아이콘 */}
                  <div className="relative">
                    <div className="w-[172px] h-[172px] rounded-full bg-[#D9EEF0] overflow-hidden flex items-center justify-center">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img src="/profile.svg" alt="default profile" />
                      )}
                    </div>

                    {/* 업로드 버튼 */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -right-12 bottom-1 w-7.5 h-7.5 group"
                    >
                      <img
                        src="/upload.svg"
                        alt="업로드"
                        className="absolute inset-0 transition-opacity duration-150 group-hover:opacity-0"
                      />
                      <img
                        src="/upload_hover.svg"
                        alt="업로드 hover"
                        className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                      />
                    </button>

                    {/* 삭제 버튼 */}
                    <button
                      type="button"
                      onClick={() => setProfileImage(null)}
                      className="absolute -right-20 bottom-1 w-7.5 h-7.5 group"
                    >
                      <img
                        src="/trash.svg"
                        alt="삭제"
                        className="absolute inset-0 transition-opacity duration-150 group-hover:opacity-0"
                      />
                      <img
                        src="/trash_hover.svg"
                        alt="삭제 hover"
                        className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                      />
                    </button>

                    {/* hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        const url = URL.createObjectURL(file);
                        setProfileImage(url);

                        // 같은 파일 다시 선택 가능하게
                        e.target.value = "";
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* ================= 입력 폼 ================= */}
              <div className="font-medium space-y-5 text-sm text-[#222829]">
                {/* 이름 */}
                <div className="flex items-center gap-11">
                  <div className="w-[120px] flex items-center gap-2 font-medium">
                    <div className="w-1 h-4 bg-[#00C3CC]" />
                    이름 <span className="text-[#00C3CC]">*</span>
                  </div>
                  <input className="mc-input w-72" placeholder="박소율" />
                </div>

                {/* 학번 */}
                <div className="flex items-center gap-16">
                  <div className="w-[100px] flex items-center gap-2 font-medium">
                    <div className="w-1 h-4 bg-[#00C3CC]" />
                    학번 <span className="text-[#00C3CC]">*</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input className="mc-input w-13" placeholder="23" />
                    <span className="font-medium text-[#495456]">학번</span>
                  </div>
                </div>

                {/* 학년 / 학기 */}
                <div className="flex items-center gap-16">
                  <div className="w-[100px] flex items-center gap-2 font-medium">
                    <div className="w-1 h-4 bg-[#00C3CC]" />
                    학년/학기수 <span className="text-[#00C3CC]">*</span>
                  </div>
                  <div className="flex gap-10">
                    <div className="flex items-center gap-3">
                      <input className="mc-input w-13" placeholder="3" />
                      <span className="font-medium text-[#495456]">학년</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input className="mc-input w-13" placeholder="6" />
                      <span className="font-medium text-[#495456]">학기</span>
                    </div>
                  </div>
                </div>

                {/* 학부 */}
                <div className="flex items-center gap-16 relative">
                  {/* 라벨 */}
                  <div className="w-[100px] flex items-center gap-2 font-medium">
                    <div className="w-1 h-4 bg-[#00C3CC]" />
                    학부 <span className="text-[#00C3CC]">*</span>
                  </div>

                  {/* 드롭다운 */}
                  <div className="relative w-72">
                    {/* ===== trigger ===== */}
                    <button
                      type="button"
                      onClick={() => setDeptOpen((prev) => !prev)}
                      className="mc-input w-full flex justify-between items-center"
                    >
                      <span
                        className={
                          department ? "text-[#222829]" : "text-gray-400"
                        }
                      >
                        {department || "학부 선택"}
                      </span>

                      <img
                        src="/dropdownArrow.svg"
                        alt="toggle"
                        className={`w-4 h-4 transition-transform duration-200 ease-in-out ${
                          deptOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* ===== dropdown ===== */}
                    <div
                      className={`
      absolute left-0 top-full mt-2.5
      w-full bg-white rounded shadow-md z-10

      overflow-hidden
      transition-[max-height] duration-300 ease-in-out
      will-change-[max-height]

      ${
        deptOpen
          ? "max-h-[245px] border-2 border-[#d1d5db]"
          : "max-h-0 border-0 pointer-events-none"
      }
    `}
                    >
                      {/* scroll area */}
                      <ul className="max-h-[220px] overflow-y-auto">
                        {departments.map((dept) => (
                          <li
                            key={dept}
                            onClick={() => {
                              setDepartment(dept);
                              setDeptOpen(false);
                            }}
                            className="px-3 py-3 cursor-pointer hover:bg-[#F5F8F8]"
                          >
                            {dept}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 전공 */}
                <div className="flex items-start gap-16">
                  <div className="w-[100px] flex items-center gap-2 font-medium mt-6">
                    <div className="w-1 h-4 bg-[#00C3CC]" />
                    전공 <span className="text-[#00C3CC]">*</span>
                  </div>
                  <div className="flex gap-2.5">
                    <div>
                      <p className="text-xs font-semibold text-[#1A858A] mb-1">
                        1전공 *
                      </p>
                      <input
                        className="mc-input w-72"
                        placeholder="시각디자인"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1A858A] mb-1">
                        2전공
                      </p>
                      <input className="mc-input w-72" placeholder="2전공" />
                    </div>
                  </div>
                </div>

                {/* 학점 */}
                <div className="flex items-center gap-16">
                  <div className="w-[100px] flex items-center gap-2 font-medium">
                    <div className="w-1 h-4 bg-[#00C3CC]" />
                    학점
                  </div>
                  <input className="mc-input w-72" placeholder="학점" />
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex justify-center mt-18">
                <button className="w-72 py-4 bg-[#00C3CC] text-white font-bold rounded">
                  가입하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* ================= GLOBAL STYLE ================= */}
      <style jsx global>{`
        .mc-input {
          padding: 12px;
          border: 2px solid #d1d5db;
          border-radius: 4px;
          font-size: 14px;
          line-height: 21px;
          color: #222829;
          background-color: #ffffff;
          box-sizing: border-box;
        }

        .mc-input::placeholder {
          color: #9ca3af;
        }

        .mc-input:focus {
          outline: none;
          border-color: #00c3cc;
        }
      `}</style>
    </div>
  );
}
