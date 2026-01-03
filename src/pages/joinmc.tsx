"use client";

import { useRef, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { departments } from "@/constants/departments";
import { SignUpRequest } from "@/types/user";
import { useSignUp } from "@/hooks/useSignUp";
import { useUserStore } from "@/stores/useUserStore";

export default function JoinMC() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /** 로그인 페이지에서 전달받은 값 */
  const email = searchParams.get("email") ?? "";
  const socialId = searchParams.get("socialId") ?? "";

  /** zustand */
  const { setUser } = useUserStore();

  /** dropdown */
  const [deptOpen, setDeptOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  /** profile image */
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  /** form */
  const [form, setForm] = useState<SignUpRequest>({
    name: "",
    studentId: "",
    grade: "",
    semester: "",
    department: "",
    firstMajor: "",
    secondMajor: "",
    phoneNumber: "",
    gpa: "",
    email,
    socialId,
  });
  const [gpaInput, setGpaInput] = useState("");

  const { submit, loading } = useSignUp();
  useEffect(() => {
    console.log("🟢 JoinMC email:", email);
    console.log("🟢 JoinMC socialId:", socialId);

    if (!email || !socialId) {
      console.error("❌ email 또는 socialId 없음");
      return;
    }

    setForm((prev) => ({
      ...prev,
      email,
      socialId,
    }));
  }, [email, socialId]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="w-full flex justify-center">
          <div className="w-[920px]">
            <h1 className="text-[32px] font-light text-[#222829] mb-5">
              회원가입하기
            </h1>

            <div className="bg-[#F5F8F8] rounded-lg px-20 py-17">
              {/* ================= 프로필 이미지 ================= */}
              <div className="mb-14">
                <div className="flex items-start">
                  <div className="w-[160px] flex items-center gap-2 text-sm font-medium text-[#222829] mt-2">
                    <div className="w-1 h-4 bg-[#00C3CC]" />
                    프로필 이미지
                  </div>

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

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -right-12 bottom-1 w-7.5 h-7.5"
                    >
                      <img src="/upload.svg" alt="upload" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileImage(null);
                        setProfileFile(null);
                      }}
                      className="absolute -right-20 bottom-1 w-7.5 h-7.5"
                    >
                      <img src="/trash.svg" alt="delete" />
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        setProfileFile(file);
                        setProfileImage(URL.createObjectURL(file));
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
                  <input
                    className="mc-input w-72"
                    placeholder="이름을 입력해주세요"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>

                {/* 학번 */}
                <div className="flex items-center gap-16">
                  <div className="w-[100px] flex items-center gap-2 font-medium">
                    <div className="w-1 h-4 bg-[#00C3CC]" />
                    학번 <span className="text-[#00C3CC]">*</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      className="mc-input w-13"
                      placeholder="23"
                      value={form.studentId}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          studentId: e.target.value,
                        }))
                      }
                    />
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
                      <input
                        className="mc-input w-13"
                        placeholder="3"
                        value={form.grade || ""}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            grade:(e.target.value),
                          }))
                        }
                      />
                      <span className="font-medium text-[#495456]">학년</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        className="mc-input w-13"
                        placeholder="6"
                        value={form.semester || ""}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            semester: (e.target.value),
                          }))
                        }
                      />
                      <span className="font-medium text-[#495456]">학기</span>
                    </div>
                  </div>
                </div>

                {/* 학부 */}
                {/* 🔧 수정 1: <di> → <div> */}
                <div className="flex items-center gap-16 relative">
                  <div className="w-[100px] flex items-center gap-2 font-medium">
                    <div className="w-1 h-4 bg-[#00C3CC]" />
                    학부 <span className="text-[#00C3CC]">*</span>
                  </div>

                  <div className="relative w-72">
                    <button
                      type="button"
                      onClick={() => setDeptOpen((prev) => !prev)}
                      className="mc-input w-full flex justify-between items-center"
                    >
                      <span
                        className={
                          selectedDepartment
                            ? "text-[#222829]"
                            : "text-[#CEDBDE]"
                        }
                      >
                        {selectedDepartment || "학부 선택"}
                      </span>

                      <img
                        src="/dropdownArrow.svg"
                        alt="toggle"
                        className={`w-4 h-4 transition-transform duration-200 ${
                          deptOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`
        absolute left-0 top-full mt-2.5
        w-full bg-white rounded-lg
        shadow-[0px_0px_20px_0px_rgba(225,237,240,1.00)]
        z-10 overflow-hidden
        transition-[max-height] duration-300 ease-in-out
        ${deptOpen ? "max-h-[245px]" : "max-h-0 pointer-events-none"}
      `}
                    >
                      <ul className="max-h-[220px] overflow-y-auto">
                        {departments.map((dept) => {
                          const isSelected = selectedDepartment === dept;

                          return (
                            <li
                              key={dept}
                              onClick={() => {
                                setSelectedDepartment(dept);
                                setForm((prev) => ({
                                  ...prev,
                                  department: dept,
                                }));
                                setDeptOpen(false);
                              }}
                              className={`
                relative px-3 py-3 cursor-pointer
                hover:bg-[#F5F8F8]
                ${isSelected ? "bg-[#E0EDEF]" : ""}
              `}
                            >
                              {isSelected && (
                                <span className="absolute left-0 top-0 h-full w-1 bg-[#00C3CC]" />
                              )}
                              <span className="pl-2">{dept}</span>
                            </li>
                          );
                        })}
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
                        placeholder="1전공"
                        value={form.firstMajor}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            firstMajor: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1A858A] mb-1">
                        2전공
                      </p>
                      <input
                        className="mc-input w-72"
                        placeholder="2전공"
                        value={form.secondMajor || ""}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            secondMajor: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* 학점 */}
                <div className="flex items-center gap-16">
                  <div className="w-[100px] flex items-center gap-2 font-medium">
                    <div className="w-1 h-4 bg-[#00C3CC]" />
                    평점 평균
                  </div>
                  <input
                    className="mc-input w-72"
                    placeholder="3.68"
                    value={gpaInput}
                    onChange={(e) => {
                      const value = e.target.value;

                      // 숫자 + 소수점만 허용
                      if (!/^\d*\.?\d*$/.test(value)) return;

                      setGpaInput(value);

                      setForm((prev) => ({
                        ...prev,
                        gpa: value,
                      }));
                    }}
                  />
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex justify-center mt-18">
                <button
                  className="w-72 py-4 bg-[#00C3CC] text-white font-bold rounded"
                  disabled={loading}
                  /* 🔧 수정 2: submit + zustand + 이동 */
                  onClick={async () => {
                    const result = await submit(form, profileFile);

                    setUser({
                      myId: result.myId,
                      name: result.name,
                    });

                    router.replace("/searchmate");
                  }}
                >
                  가입하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .mc-input {
          padding: 12px;
          border: 2px solid #d1d5db;
          border-radius: 4px;
          font-size: 14px;
          color: #495456;
        }
        .mc-input:focus {
          outline: none;
          border-color: #00c3cc;
        }
      `}</style>
    </div>
  );
}
