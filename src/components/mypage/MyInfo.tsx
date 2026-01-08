"use client";

import { useEffect, useRef, useState } from "react";
import axios from "@/api/axios";
import { useUserStore } from "@/stores/useUserStore";
import { departments } from "@/constants/departments";
import Snackbar from "@/components/common/Snackbar";
import { MateProfileInfo } from "@/types/user";
import { getSendbird } from "@/lib/sendbird/sendbird";

type Activity = {
  year: number;
  title: string;
  link?: string;
};

type Props = {
  profile: MateProfileInfo; // ✅ 부모가 들고있는 좌측용 profile
  setProfile: React.Dispatch<React.SetStateAction<MateProfileInfo | null>>; // ✅ 좌측 즉시 갱신용
};
function isValidUrl(url: string) {
  try {
    new URL(url.startsWith("http") ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
}

export default function MyInfo({ profile, setProfile }: Props) {
  const sb = getSendbird();
  const myId = useUserStore((state) => state.user?.myId);

  /* ================= 상태 ================= */
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    firstMajor: "",
    secondMajor: "",
    gpa: "",
    studentId: "",
    grade: "",
    semester: "",
    introduction: "",
    skillList: [] as string[],
    activity: [] as Activity[],
  });

  /* profile image */
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("profileSaved");

    if (saved === "true") {
      setShowSaveSnackbar(true);
      sessionStorage.removeItem("profileSaved"); // 한 번만 뜨게
    }
  }, []);

  const uploadProfileImage = async (file: File) => {
    if (!myId) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      await axios.post(`/user/updateImage/${myId}`, formData);

      const profileRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/mateProfile/${myId}`
      );

      const imageUrl = profileRes.data.imageUrl;

      setProfileImage(imageUrl);

      await sb.updateCurrentUserInfo({
        profileUrl: imageUrl || "/profile.svg",
      });

      alert("프로필 사진이 변경되었습니다.");

      /* ✅ 새로고침 */
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteProfileImage = async () => {
    if (!myId) return;
    if (!profileImage) {
      alert("기본 프로필 이미지입니다.");
      return;
    }

    try {
      // 1️⃣ 서버에서 프로필 이미지 삭제
      await axios.delete(`/user/myProfile/${myId}`);

      // 2️⃣ UI 상태 반영
      setProfileImage(null);

      // 3️⃣ 🔥 Sendbird 프로필 이미지 제거
      await sb.updateCurrentUserInfo({
        profileUrl: "", // ← 이게 핵심
      });

      alert("프로필 사진이 삭제되었습니다.");
      window.location.reload();
    } catch (e) {
      console.error("❌ image delete error", e);
      alert("사진 삭제 실패");
    }
  };

  /* department dropdown */
  const [deptOpen, setDeptOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  //키워드 상태관리
  const [keywordInput, setKeywordInput] = useState("");
  //스낵바 상태관리
  const [showSaveSnackbar, setShowSaveSnackbar] = useState(false);

  const addKeyword = () => {
    const value = keywordInput.trim();
    if (!value) return;

    if (form.skillList.length >= 10) {
      alert("키워드는 최대 10개까지 입력할 수 있어요.");
      return;
    }

    if (form.skillList.includes(value)) {
      setKeywordInput("");
      return;
    }

    setForm((p) => ({
      ...p,
      skillList: [...p.skillList, value],
    }));

    setKeywordInput("");
  };

  const removeKeyword = (keyword: string) => {
    setForm((p) => ({
      ...p,
      skillList: p.skillList.filter((k) => k !== keyword),
    }));
  };

  //연도별 정렬
  const sortByYearDesc = (activity: Activity[]) =>
    [...activity].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  const addActivity = () => {
    setForm((p) => ({
      ...p,
      activity: sortByYearDesc([
        ...p.activity,
        { year: new Date().getFullYear(), title: "", link: "" },
      ]),
    }));
  };

  const updateActivity = (
    index: number,
    field: "year" | "title" | "link",
    value: string
  ) => {
    setForm((p) => {
      let newValue: any = value;

      if (field === "link" && value) {
        const normalized = value.startsWith("http")
          ? value
          : `https://${value}`;

        if (!isValidUrl(normalized)) {
          alert("유효하지 않은 링크입니다.");
          return p; // ❌ 상태 변경 안 함
        }

        newValue = normalized;
      }

      const updated = p.activity.map((a, i) =>
        i === index
          ? {
              ...a,
              [field]: field === "year" ? Number(newValue) : newValue,
            }
          : a
      );

      return {
        ...p,
        activity: sortByYearDesc(updated),
      };
    });
  };

  const removeActivity = (index: number) => {
    setForm((p) => ({
      ...p,
      activity: p.activity.filter((_, i) => i !== index),
    }));
  };

  /* ================= GET: 내 프로필 ================= */
  useEffect(() => {
    if (!myId) return;

    const fetchMyProfile = async () => {
      try {
        const res = await axios.get(`/user/myProfile/${myId}`);
        const data = res.data;

        setForm({
          name: data.name ?? "",
          email: data.email ?? "",
          department: data.department ?? "",
          firstMajor: data.firstMajor ?? "",
          secondMajor: data.secondMajor ?? "",
          gpa: data.gpa ?? "",
          studentId: data.studentId ?? "",
          grade: data.grade ?? "",
          semester: String(data.semester ?? ""),
          introduction: data.introduction ?? "",
          skillList: data.skillList ?? [],
          activity: data.activity ?? [],
        });

        setSelectedDepartment(data.department ?? "");
        setProfileImage(data.imageUrl ?? null);
      } catch (e) {
        console.error("❌ myProfile fetch error", e);
      }
    };

    fetchMyProfile();
  }, [myId]);

  /* ================= PATCH: 저장 ================= */
  const handleSave = async () => {
    if (!myId) return;

    const payload = {
      name: form.name,
      email: form.email,
      department: form.department,
      firstMajor: form.firstMajor,
      secondMajor: form.secondMajor,
      gpa: form.gpa,
      studentId: form.studentId,
      grade: String(form.grade),
      semester: String(form.semester),
      introduction: form.introduction,
      skillList: form.skillList,
      activity: form.activity
        // ❌ 제목 없는 항목 제거 (선택)
        .filter((a) => a.title.trim() !== "")
        // ❌ 링크가 있다면 유효한 것만 통과
        .filter((a) => !a.link || isValidUrl(a.link))
        // 🔽 년도 내림차순 정렬
        .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
        // 🔽 서버 payload 변환
        .map((a) => ({
          year: String(a.year),
          title: a.title,
          link: a.link
            ? a.link.startsWith("http")
              ? a.link
              : `https://${a.link}`
            : "",
        })),
    };

    try {
      /* ================= 서버 저장 ================= */
      await axios.patch(`/user/update/${myId}`, payload);

      if (!sb.currentUser) return;

      /* ================= Sendbird 기본 정보 ================= */
      await sb.updateCurrentUserInfo({
        nickname: payload.name,
      });

      /* ================= Sendbird 메타데이터 ================= */
      await sb.currentUser.updateMetaData(
        {
          studentId: payload.studentId ?? "",
          major1: payload.firstMajor ?? "",
          major2: payload.secondMajor ?? "",
        },
        true
      );

      /* ✅ 새로고침 후 스낵바 표시용 플래그 */
      sessionStorage.setItem("profileSaved", "true");

      /* ✅ 새로고침 */
      window.location.reload();
    } catch (e) {
      console.error("❌ update profile error", e);
      alert("저장에 실패했습니다.");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="px-20 py-17">
      {/* 섹션 제목 */}
      <div className="text-2xl font-extrabold text-[#222829] mb-10">
        <img src="/chat.svg" className="inline-flex pr-2.5" />
        <span className="w-[83px] h-[23px]">기본정보</span>
      </div>
      {/* ================= 프로필 이미지 ================= */}
      <div className="mb-13">
        <div className="flex items-start">
          <div className="w-[160px] flex items-center gap-2 text-base font-medium text-[#222829] mt-2">
            <div className="w-1 h-4 bg-[#00C3CC]" />
            프로필 이미지
          </div>

          <div className="relative">
            <div className="w-43 h-43 rounded-full bg-[#D9EEF0] overflow-hidden flex items-center justify-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src="/profile.svg" />
              )}
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -right-12 bottom-1 w-7.5 h-7.5"
            >
              <img src="/upload.svg" />
            </button>

            <button
              type="button"
              onClick={deleteProfileImage}
              className="absolute -right-20 bottom-1 w-7.5 h-7.5"
            >
              <img src="/trash.svg" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setProfileImage(URL.createObjectURL(file)); // 미리보기
                uploadProfileImage(file); // 🔥 즉시 POST
                e.target.value = "";
              }}
            />
          </div>
        </div>
      </div>
      {/* ================= 입력 폼 ================= */}
      <div className="font-medium space-y-5 text-base text-[#222829]">
        {/* 이름 */}
        <div className="flex items-center gap-13 h-[45px]">
          <div className="w-[116px] flex items-center">
            <div className="w-1 h-4 bg-[#00C3CC] mr-3" />
            이름 <span className="text-[#0FA4AB] ml-1">*</span>
          </div>
          <input
            className="mc-input w-72.5"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        </div>

        {/* 학번 */}
        <div className="flex items-center gap-13 h-[45px]">
          <div className="w-[116px] flex items-center">
            <div className="w-1 h-4 bg-[#00C3CC] mr-3" />
            학번<span className="text-[#0FA4AB] ml-1">*</span>
          </div>
          <input
            className="mc-input w-13"
            value={form.studentId}
            onChange={(e) =>
              setForm((p) => ({ ...p, studentId: e.target.value }))
            }
          />
        </div>

        {/* 학년 / 학기 */}
        <div className="flex items-center gap-13 h-[45px]">
          <div className="w-[116px] flex items-center">
            <div className="w-1 h-4 bg-[#00C3CC] mr-3" />
            <span className="w-25">
              학년/학기수 <span className="text-[#0FA4AB] ml-1">*</span>
            </span>
          </div>
          <div className="flex gap-10">
            <input
              className="mc-input w-13"
              value={form.grade}
              onChange={(e) =>
                setForm((p) => ({ ...p, grade: e.target.value }))
              }
            />
            <input
              className="mc-input w-13"
              value={form.semester}
              onChange={(e) =>
                setForm((p) => ({ ...p, semester: e.target.value }))
              }
            />
          </div>
        </div>

        {/* 학부 */}
        <div className="flex items-center gap-13 h-[45px]">
          <div className="w-[116px] flex items-center">
            <div className="w-1 h-4 bg-[#00C3CC] mr-3" />
            학부<span className="text-[#0FA4AB] ml-1">*</span>
          </div>

          <div className="w-72 relative">
            <button
              type="button"
              onClick={() => setDeptOpen((p) => !p)}
              className="mc-input w-full flex justify-between items-center"
            >
              <span
                className={
                  selectedDepartment ? "text-[#222829]" : "text-[#CEDBDE]"
                }
              >
                {selectedDepartment || "학부 선택"}
              </span>
              <img src="/dropdownArrow.svg" />
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
                        setForm((p) => ({ ...p, department: dept }));
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
        <div className="flex items-center gap-13 h-[63px]">
          <div className="w-[116px] flex items-center">
            <div className="w-1 h-4 bg-[#00C3CC] mr-3" />
            전공<span className="text-[#0FA4AB] ml-1">*</span>
          </div>
          <div className="flex">
            <div className="mr-2.5">
              <span className="flex text-xs w-[291px] h-3.5 mb-1 text-[#1A858A]">
                1전공 *
              </span>
              <input
                className="mc-input w-72"
                placeholder="1전공"
                value={form.firstMajor}
                onChange={(e) =>
                  setForm((p) => ({ ...p, firstMajor: e.target.value }))
                }
              />
            </div>
            <div>
              <span className="flex text-xs w-[291px] h-3.5 mb-1 text-[#1A858A]">
                2전공 *
              </span>
              <input
                className="mc-input w-72"
                placeholder="2전공"
                value={form.secondMajor}
                onChange={(e) =>
                  setForm((p) => ({ ...p, secondMajor: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        {/* 학점 */}
        <div className="flex items-center gap-13 h-[45px]">
          <div className="w-[116px] flex items-center">
            <div className="w-1 h-4 bg-[#00C3CC] mr-3" />
            평점 평균
          </div>
          <input
            className="mc-input w-72"
            value={form.gpa}
            onChange={(e) => setForm((p) => ({ ...p, gpa: e.target.value }))}
          />
        </div>

        {/* 이메일 (읽기 전용) */}
        <div className="flex items-center gap-13 h-[45px]">
          <div className="w-[116px] flex items-center">
            <div className="w-1 h-4 bg-[#00C3CC] mr-3" />
            이메일
          </div>
          <input
            className="mc-input w-72 bg-gray-100"
            value={form.email}
            disabled
          />
        </div>

        {/* 자기소개 섹션 */}
        <div>
          <div className="text-2xl font-extrabold text-[#222829] mt-18 mb-10">
            <img src="/chat.svg" className="inline-flex pr-2.5" />
            <span className="w-[83px] h-[23px]">자기소개</span>
          </div>
          <div className=" flex items-center mb-3">
            <div className="w-1 h-4 bg-[#00C3CC] mr-3" />
            당신은 어떤 메이트인가요?
            <span className="text-[#B7C4C7] ml-1"> (100자제한)</span>
          </div>
          <input
            className="mc-input w-[956px] ml-4 mb-10"
            value={form.introduction}
            onChange={(e) =>
              setForm((p) => ({ ...p, introduction: e.target.value }))
            }
            placeholder="자기소개 (100자 제한)"
          />
          <div className=" flex items-center mb-3">
            <div className="w-1 h-4 bg-[#00C3CC] mr-3" />
            나를 표현하는 키워드
            <span className="text-[#B7C4C7] ml-1"> (10개 제한)</span>
          </div>
          {/* 키워드 입력 + 목록 */}
          <div className="flex flex-wrap items-center gap-2 ml-4">
            {form.skillList.map((keyword, idx) => (
              <div
                key={idx}
                className="flex items-center mc-input text-[#495456] text-base font-medium"
              >
                <span>#{keyword}</span>
                <button
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className="text-[#B7C4C7] ml-1 text-xl mb-1 hover:text-[#00C3CC]"
                >
                  ×
                </button>
              </div>
            ))}

            {form.skillList.length < 10 && (
              <>
                <input
                  className="mc-input w-[145px]"
                  placeholder="(ex) 자료조사"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addKeyword();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addKeyword}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <img src="/add.svg" alt="add" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* 활동내역 섹션 */}
        <div className="text-2xl font-extrabold text-[#222829] mt-18 mb-10">
          <img src="/activitylist.svg" className="inline-flex pr-2.5" />
          <span className="w-[83px] h-[23px]">활동내역</span>
        </div>
        <div className=" flex items-center mb-3">
          <div className="w-1 h-4 bg-[#00C3CC] mr-3" />
          포트폴리오 링크, 학회/동아리 활동, 수상 내역 등 다양하게 작성해보세요.
        </div>
        <div className="ml-4 space-y-3">
          {form.activity.map((act, idx) => (
            <div key={idx} className="flex items-center gap-4">
              {/* 년도 */}
              <input
                className="mc-input w-16"
                placeholder="년도"
                value={act.year || ""}
                onChange={(e) => updateActivity(idx, "year", e.target.value)}
              />

              {/* 내용 */}
              <input
                className="mc-input w-[420px]"
                placeholder="내용"
                value={act.title}
                onChange={(e) => updateActivity(idx, "title", e.target.value)}
              />

              {/* 링크 */}
              <input
                className="mc-input w-[164px]"
                placeholder="링크"
                value={act.link || ""}
                onChange={(e) => updateActivity(idx, "link", e.target.value)}
              />

              {/* 삭제 */}
              <button
                type="button"
                onClick={() => removeActivity(idx)}
                className="text-[#B7C4C7] hover:text-[#00C3CC] text-lg"
              >
                ×
              </button>
            </div>
          ))}

          {/* 추가 버튼 */}
          <button
            type="button"
            onClick={addActivity}
            className="flex items-center gap-2 text-sm text-[#0FA4AB] mt-2"
          >
            <img src="/add.svg" className="w-6 h-6" />
          </button>
        </div>
      </div>
      {/* 저장 버튼 */}
      <div className="flex justify-center mt-18">
        <button
          className="w-72 h-16 py-4 bg-[#00C3CC] text-white font-bold rounded"
          onClick={handleSave}
        >
          저장하기
        </button>
      </div>
      {showSaveSnackbar && (
        <Snackbar
          message="내 정보가 저장되었습니다."
          actionText="확인"
          duration={3000}
          onClose={() => setShowSaveSnackbar(false)}
        />
      )}
    </div>
  );
}
