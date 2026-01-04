import { useState } from "react";
import { useRouter } from "next/router";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

import { useUserStore } from "@/stores/useUserStore";
import { createRecruiting } from "@/api/recruiting";

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
      keyword: keywords,
    });

    router.push("/recruitmate");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
      <Header />

      <main className="flex-1">
        <div className="max-w-[920px] mx-auto px-10 py-12">
          {/* breadcrumb */}
          <div className="flex items-center text-sm font-medium text-[#838F91] mb-8">
            모집하기
            <img src="/images/Vector.svg" className="w-2 h-2 mx-2" />
            글 쓰기
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

                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className="border px-4 py-2 rounded text-sm w-40"
                  >
                    <option>수업</option>
                    <option>동아리</option>
                    <option>학회</option>
                    <option>대회</option>
                  </select>
                </div>

                {/* 수업명 + 분반 */}
                <div className="flex items-center gap-4">
                  <div className="w-1 h-4 opacity-0" />
                  <span className="w-24" />

                  <input
                    name="projectSpecific"
                    placeholder="(ex) 환경과 인간, 컴퓨터 구조"
                    onChange={handleChange}
                    className="
                      w-72
                      border
                      px-3
                      py-2
                      rounded
                      text-sm
                      placeholder:text-[#CEDBDE]
                    "
                  />

                  <input
                    name="classes"
                    type="number"
                    placeholder="2"
                    onChange={handleChange}
                    className="
                      w-12
                      border
                      px-3
                      py-2
                      rounded
                      text-sm
                      text-center
                      placeholder:text-[#CEDBDE]
                    "
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
                    className="
                      w-72
                      border
                      px-3
                      py-2
                      rounded
                      text-sm
                      placeholder:text-[#CEDBDE]
                    "
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
                  className="
                    w-12
                    border
                    px-3
                    py-2
                    rounded
                    text-sm
                    placeholder:text-[#CEDBDE]
                  "
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
                  className="
                    w-12
                    border
                    px-3
                    py-2
                    rounded
                    text-sm
                    placeholder:text-[#CEDBDE]
                  "
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

                <div className="inline-flex justify-start gap-5 items-center">
                  <input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="(ex) 자료조사"
                    className="
                      w-36
                      border
                      px-3
                      py-2
                      rounded
                      text-sm
                      placeholder:text-[#CEDBDE]
                    "
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="w-8 h-8 rounded text-[#0FA4AB] font-bold"
                  >
                    <img src="/images/add.svg" alt="+" className="w-4 h-4" />
                  </button>
                </div>

                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 ml-[calc(1rem+7rem)]">
                    {keywords.map((k) => (
                      <span
                        key={k}
                        className="px-3 py-1 text-xs rounded bg-[#EEF7F8] text-[#0FA4AB]"
                      >
                        #{k}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 제목 */}
              <input
                name="title"
                placeholder="제목을 입력해주세요"
                onChange={handleChange}
                className="
                  border
                  px-7
                  py-6
                  rounded
                  text-l
                  placeholder:text-[#CEDBDE]
                  placeholder:text-xl
                  placeholder:font-extrabold
                  placeholder:justify-start
                "
              />

              {/* 내용 */}
              <textarea
                name="context"
                rows={10}
                placeholder="내용을 입력해주세요"
                onChange={handleChange}
                className="
                  border
                  px-4
                  py-3
                  rounded
                  resize-none
                  text-sm
                  placeholder:text-[#CEDBDE]
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
