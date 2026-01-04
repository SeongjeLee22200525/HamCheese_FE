import { useState } from "react";
import { useRouter } from "next/router";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

import { useUserStore } from "@/stores/useUserStore";
import { createRecruiting } from "@/api/recruiting";
import { types } from "@/constants/types";

export default function RecruitMateCreate() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const [form, setForm] = useState({
    projectType: "수업",
    projectSpecific: "",
    classes: "",
    topic: "",
    totalPeople: "",
    recruitPeople: "",
    title: "",
    context: "",
  });

  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addKeyword = () => {
    if (!keywordInput.trim()) return;
    if (keywords.length >= 10) return;
    setKeywords((prev) => [...prev, keywordInput.trim()]);
    setKeywordInput("");
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    await createRecruiting(user.myId, {
      projectType: form.projectType,
      projectSpecific: form.projectSpecific,
      classes: Number(form.classes),
      topic: form.topic,
      totalPeople: Number(form.totalPeople),
      recruitPeople: Number(form.recruitPeople),
      title: form.title,
      context: form.context,
      myKeyword: keywords,
    });

    router.push("/recruitmate");
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
        <div className="max-w-[920px] mx-auto px-10 py-12">
          {/* breadcrumb */}
          <div className="flex items-center text-m font-medium text-[#838F91] mb-3">
            모집하기
            <img src="/images/Vector.svg" className="w-2 h-2 mx-2" />글 쓰기
          </div>

          <div className="bg-white border border-[#E6EEF0] rounded p-10">
            <div className="flex flex-col gap-7">
              {/* 모집 유형 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-6">
                  <div className="w-1 h-4 bg-[#00C3CC]" />
                  <span className="w-20 text-sm font-bold text-[#495456]">
                    모집 유형
                  </span>

                  <div className="relative w-40">
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="
      w-full
      appearance-none
      border border-[#E6EEF0]
      rounded
      px-4 py-2 pr-10
      text-sm text-[#222829]
      focus:outline-none
      bg-white
    "
                    >
                      {types.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>

                    {/* dropdown arrow */}
                    <img
                      src="/dropdownArrow.svg"
                      alt=""
                      className="
      pointer-events-none
      absolute
      right-3
      top-1/2
      -translate-y-1/2
      w-4 h-4
    "
                    />
                  </div>
                </div>

                {/* 수업명 + 분반 */}
                <div className="flex items-center gap-4">
                  <div className="w-1 h-4 opacity-0" />
                  <span className="w-24" />

                  <input
                    name="projectSpecific"
                    placeholder="(ex) 환경과 인간, 컴퓨터 구조"
                    onChange={handleChange}
                    className={`${inputBaseClass} w-72 px-3 py-2`}
                  />

                  <input
                    name="classes"
                    placeholder="2"
                    onChange={handleChange}
                    className={`${inputBaseClass} w-12 px-3 py-2 text-center`}
                  />
                  <span className="text-sm text-[#6B7280]">분반</span>
                </div>
              </div>

              {/* 주제 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-6">
                  <div className="w-1 h-4 bg-[#00C3CC]" />
                  <span className="w-20 text-sm font-bold text-[#495456]">
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
                <span className="w-20 text-sm font-bold text-[#495456]">
                  전체 인원
                </span>

                <input
                  name="totalPeople"
                  type="number"
                  placeholder="5"
                  onChange={handleChange}
                  className={`${inputBaseClass} w-14 px-3 py-2`}
                />
                <span className="text-sm text-[#6B7280]">명</span>
              </div>

              {/* 모집 인원 */}
              <div className="flex items-center gap-6">
                <div className="w-1 h-4 bg-[#00C3CC]" />
                <span className="w-20 text-sm font-bold text-[#495456]">
                  모집 인원
                </span>

                <input
                  name="recruitPeople"
                  type="number"
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
                  <span className="text-sm font-bold text-[#495456]">
                    이 수업에서 본인이 가장 잘 할 수 있는 키워드를 적어주세요
                    <span className="text-[#9CA3AF]"> (10개 제한)</span>
                  </span>
                </div>

                {/* 해시태그 + 입력칸 (맨 왼쪽 시작) */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* 해시태그 */}
                  {keywords.map((k) => (
                    <div
                      key={k}
                      className="
          h-10
          px-3
          flex items-center
          border border-[#E6EEF0]
          rounded
          text-sm
          text-[#0FA4AB]
          bg-[#EEF7F8]
          whitespace-nowrap
        "
                    >
                      #{k}
                    </div>
                  ))}

                  {/* 입력칸 */}
                  <input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="(ex) 자료조사"
                    className="
        h-10
        w-36
        border border-[#E6EEF0]
        rounded
        px-3
        text-sm
        text-[#222829]
        placeholder:text-[#CEDBDE]
        focus:outline-none
      "
                  />

                  {/* + 버튼 */}
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="h-10 w-10 flex items-center justify-center"
                  >
                    <img src="/images/add.svg" alt="+" className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 제목 */}
              <input
                name="title"
                placeholder="제목을 입력해주세요"
                onChange={handleChange}
                className="
                  border border-[#E6EEF0]
                  rounded
                  px-7 py-6
                  text-xl font-extrabold text-[#222829]
                  placeholder:text-[#CEDBDE]
                  focus:outline-none
                "
              />

              {/* 내용 */}
              <textarea
                name="context"
                rows={10}
                placeholder="내용을 입력해주세요"
                onChange={handleChange}
                className="
                  border border-[#E6EEF0]
                  rounded
                  px-4 py-3
                  resize-none
                  text-sm text-[#222829]
                  placeholder:text-[#CEDBDE]
                  focus:outline-none
                "
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-center gap-6 mt-12">
            <button
              onClick={() => router.back()}
              className="w-40 h-12 rounded bg-[#E5E7EB] text-[#374151]"
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

      <Footer />
    </div>
  );
}
