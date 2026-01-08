import { useState } from "react";
import { useRouter } from "next/router";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

import { useUserStore } from "@/stores/useUserStore";
import { createRecruiting } from "@/api/recruiting";
import { types, PROJECT_TYPE_CONFIG } from "@/constants/types";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function RecruitMateCreate() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  //그만두기 모달 상태 관리
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  type ProjectFieldName =
    | "projectSpecific"
    | "classes"
    | "graduationTopic"
    | "professor"
    | "clubName"
    | "part"
    | "contestName"
    | "contestPart"
    | "topic"
    | "totalPeople"
    | "recruitPeople"
    | "title"
    | "context";

  const [form, setForm] = useState<
    Record<ProjectFieldName, string> & {
      projectType: (typeof types)[number];
    }
  >({
    projectType: "수업",

    projectSpecific: "",
    classes: "",

    graduationTopic: "",
    professor: "",

    clubName: "",
    part: "",

    contestName: "",
    contestPart: "",

    topic: "",
    totalPeople: "",
    recruitPeople: "",
    title: "",
    context: "",
  });

  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [openType, setOpenType] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const validateByType = () => {
    switch (form.projectType) {
      case "수업":
        return form.projectSpecific.trim();

      case "졸업작품":
        return form.graduationTopic.trim();

      case "동아리/학회":
        return form.clubName.trim();

      case "대회":
        return form.contestName.trim();

      default:
        return false;
    }
  };

  const addKeyword = () => {
    if (!keywordInput.trim()) return;
    if (keywords.length >= 10) return;

    setKeywords((prev) => [...prev, keywordInput.trim()]);
    setKeywordInput("");
  };

  const removeKeyword = (target: string) => {
    setKeywords((prev) => prev.filter((k) => k !== target));
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 필수값 검증
    if (
      !validateByType() ||
      !form.topic.trim() ||
      !form.title.trim() ||
      !form.context.trim() ||
      !form.totalPeople ||
      !form.recruitPeople
    ) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    const totalPeopleNum = Number(form.totalPeople);
    const recruitPeopleNum = Number(form.recruitPeople);

    if (recruitPeopleNum > totalPeopleNum) {
      alert("모집 인원은 전체 인원보다 클 수 없습니다.");
      return;
    }

    // ✅ 키워드 submit 보정
    const finalKeywords = keywordInput.trim()
      ? [...keywords, keywordInput.trim()]
      : keywords;

    try {
      const payload: any = {
        projectType: form.projectType,
        topic: form.topic.trim(),
        totalPeople: totalPeopleNum,
        recruitPeople: recruitPeopleNum,
        title: form.title.trim(),
        context: form.context.trim(),
        myKeyword: finalKeywords,
      };

      // 타입별 필드 분기
      if (form.projectType === "수업") {
        payload.projectSpecific = form.projectSpecific.trim(); // 과목
        payload.classes = form.classes.trim(); // 분반
      }

      if (form.projectType === "졸업작품") {
        payload.projectSpecific = form.graduationTopic.trim(); // 과목 칸에 졸업작품명
        payload.classes = form.professor.trim(); // classes에 교수님
      }

      if (form.projectType === "동아리/학회") {
        payload.projectSpecific = form.clubName.trim(); // 과목 칸
        payload.classes = form.part.trim(); // classes에 파트
      }

      if (form.projectType === "대회") {
        payload.projectSpecific = form.contestName.trim(); // 과목 칸
        payload.classes = form.contestPart.trim(); // classes에 파트/역할
      }

      await createRecruiting(user.myId, payload);

      sessionStorage.setItem("recruitingCreated", "true");
      router.push("/recruitmate");
    } catch (e) {
      console.error("createRecruiting error:", e);
      alert("모집글 생성에 실패했습니다.");
    }
  };

  const renderTypeRow = () => {
    const config =
      PROJECT_TYPE_CONFIG[form.projectType as keyof typeof PROJECT_TYPE_CONFIG];
    if (!config) return null;

    return (
      <div className="flex items-center gap-3 ml-33">
        {config.fields.map((field) => {
          const name = field.name as ProjectFieldName; // ⭐ 핵심 추가

          return (
            <div key={name} className="flex items-center gap-2">
              <input
                name={name}
                type={field.type ?? "text"}
                placeholder={field.placeholder}
                value={form[name]}
                onChange={handleChange}
                className={`${inputBaseClass} ${field.width} px-3 py-2 ${
                  field.type === "number" ? "text-center" : ""
                }`}
              />

              {field.suffix && (
                <span className="text-sm text-[#6B7280]">{field.suffix}</span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const inputBaseClass = `
    border border-[#E6EEF0]
    rounded
    text-sm text-[#222829]
    placeholder:text-[#CEDBDE]
    focus:outline-none
  `;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-10 py-12">
          {/* breadcrumb */}
          <div className="flex items-center text-lg font-medium text-[#838F91] mb-3">
            모집하기
            <img src="/images/Vector.svg" className="w-3 h-3 mx-2" />글 쓰기
          </div>

          <div className="bg-white border border-[#E6EEF0] rounded p-10">
            <div className="flex flex-col gap-7">
              {/* 모집 유형 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-6">
                  <div className="w-1 h-4 bg-[#00C3CC]" />
                  <span className="w-20 text-lg font-bold text-[#495456]">
                    모집 유형
                  </span>

                  <div className="relative w-40">
                    {/* 닫힌 상태 (기본값 표시) */}
                    <button
                      type="button"
                      onClick={() => setOpenType((v) => !v)}
                      className="
      w-36
      h-10
      px-4
      flex items-center justify-between
      border border-[#E6EEF0]
      rounded
      bg-[#FFFFFF]
      text-sm text-[#495456]
    "
                    >
                      {form.projectType}
                      <img src="/dropdownArrow.svg" className="w-4 h-4" />
                    </button>

                    {/* 펼쳐진 옵션 */}
                    {openType && (
                      <ul
                        className="
        absolute z-20 mt-2 w-full
        bg-white
        border border-[#F3A6C8]   /* 분홍 테두리 */
        rounded-lg
        overflow-hidden
        shadow-sm
      "
                      >
                        {types.map((type) => (
                          <li
                            key={type}
                            onClick={() => {
                              setForm((prev) => ({
                                ...prev,
                                projectType: type,
                              }));
                              setOpenType(false);
                            }}
                            className="
            p-2
            text-base text-[#222829]
            cursor-pointer
            hover:bg-[#FFF0F7]
          "
                          >
                            {type}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* 타입별 입력 UI */}
                {renderTypeRow()}
              </div>

              {/* 주제 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-6">
                  <div className="w-1 h-4 bg-[#00C3CC]" />
                  <span className="w-20 text-lg font-bold text-[#495456]">
                    주제
                  </span>

                  <input
                    name="topic"
                    placeholder="해양생물"
                    onChange={handleChange}
                    className={`${inputBaseClass} w-72 px-3 py-2`}
                  />
                </div>

                <p className="text-xs text-[#9CA3AF] ml-[calc(1rem+7rem)]">
                  * 주제가 정해지지 않았다면 미정이라고 적어주세요.
                </p>
              </div>

              {/* 전체 인원 */}
              <div className="flex items-center gap-6">
                <div className="w-1 h-4 bg-[#00C3CC]" />
                <span className="w-20 text-lg font-bold text-[#495456]">
                  전체 인원
                </span>

                <input
                  name="totalPeople"
                  type="number"
                  min={1}
                  placeholder="5"
                  onChange={handleChange}
                  className={`${inputBaseClass} w-14 px-3 py-2`}
                />
                <span className="text-sm text-[#6B7280]">명</span>
              </div>

              {/* 모집 인원 */}
              <div className="flex items-center gap-6">
                <div className="w-1 h-4 bg-[#00C3CC]" />
                <span className="w-20 text-lg font-bold text-[#495456]">
                  모집 인원
                </span>

                <input
                  name="recruitPeople"
                  type="number"
                  min={1}
                  placeholder="4"
                  onChange={handleChange}
                  className={`${inputBaseClass} w-14 px-3 py-2`}
                />
                <span className="text-sm text-[#6B7280]">명</span>
              </div>

              {/* 키워드 */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-6">
                  <div className="w-1 h-4 bg-[#00C3CC]" />
                  <span className="text-lg font-bold text-[#495456]">
                    이 수업에서 본인이 가장 잘 할 수 있는 키워드를 적어주세요
                    <span className="text-[#9CA3AF] font-medium">
                      {" "}
                      (10개 제한)
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap ml-7">
                  {keywords.map((k) => (
                    <div
                      key={k}
                      className="
        h-10
        px-3
        flex
        items-center
        gap-1
        rounded outline outline-2 outline-offset-[-2px] outline-[#E1EDF0]
        text-sm
        text-[#495456]
      "
                    >
                      #{k}
                      <button
                        type="button"
                        onClick={() => removeKeyword(k)}
                        className="ml-1 text-[#9CA3AF] hover:text-[#EF4444]"
                      >
                        <img src="/images/cancel.svg" className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  {/* 입력창 */}
                  <div className="flex items-center gap-2">
                    <input
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      placeholder="(ex) 자료조사"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addKeyword();
                        }
                      }}
                      className="h-10 w-36 border border-[#E6EEF0] rounded px-3 text-sm text-[#222829] placeholder:text-[#CEDBDE] focus:outline-none"
                    />

                    <button
                      type="button"
                      onClick={addKeyword}
                      className="h-10 w-10 flex items-center justify-center"
                    >
                      <img src="/images/add.svg" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 제목 */}
              <input
                name="title"
                placeholder="제목을 입력해주세요"
                onChange={handleChange}
                className="border border-[#E6EEF0] rounded px-7 py-6 text-xl font-extrabold text-[#222829] placeholder:text-[#CEDBDE] focus:outline-none"
              />

              {/* 내용 */}
              <textarea
                name="context"
                rows={10}
                placeholder="내용을 입력해주세요"
                onChange={handleChange}
                className="border border-[#E6EEF0] rounded px-7 py-6 resize-none text-lg text-[#222829] placeholder:text-[#CEDBDE] focus:outline-none"
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-center gap-6 mt-12">
            <button
              onClick={() => setShowExitConfirm(true)}
              className="w-40 h-12 rounded bg-[#E5E7EB] text-[#374151] font-extrabold"
            >
              취소
            </button>

            <button
              onClick={handleSubmit}
              className="w-40 h-12 rounded bg-[#6EC6CC] text-white font-extrabold"
            >
              게시하기
            </button>
          </div>
        </div>
      </main>
      {showExitConfirm && (
        <ConfirmModal
          title={`정말로 글쓰기를 그만두시겠습니까?\n지금까지 작성된 글은 저장되지 않아요.`}
          cancelText="계속 하기"
          confirmText="그만두기"
          onCancel={() => setShowExitConfirm(false)}
          onConfirm={() => {
            setShowExitConfirm(false);
            router.back();
          }}
        />
      )}

      <Footer />
    </div>
  );
}
