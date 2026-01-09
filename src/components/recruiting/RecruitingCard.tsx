import { Recruiting } from "@/types/recruiting";

type Props = {
  item: Recruiting;
  onClick: (id: number) => void;
};

/* 날짜 포맷 함수 */
const formatRecruitingDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isToday) {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}.${mm}.${dd}`;
};

export default function RecruitingCard({ item, onClick }: Props) {
  const hasKeyword = (item.myKeyword ?? []).length > 0;

  return (
    <div
      onClick={() => onClick(item.recruitingId)}
      className="
        w-full
        outline-1 -outline-offset-1 outline-[#CEDBDE]
        rounded-lg
        hover:shadow-[0px_2px_4px_0px_rgba(225,237,240,1.00)]
        px-10 py-10
        bg-white
        cursor-pointer
      "
    >
      <div className="flex items-center justify-between gap-8">
        {/* 왼쪽 영역 */}
        <div className="flex-1 min-w-0 pl-2">
          {/* 상단 메타 */}
          <div className="flex items-center gap-3 text-sm text-[#6B7280] mb-3 flex-wrap">
            <span className="px-3 py-1.5 rounded bg-[#F5F8F8] text-[#0FA4AB] font-bold whitespace-nowrap">
              모집인원 {item.recruitPeople}{" "}
              <span className="font-medium">/</span> {item.totalPeople}
            </span>

            <span className="text-[#00AEB5] font-bold whitespace-nowrap">
              {item.projectType}
            </span>

            {/* 🔥 여기 핵심 수정 */}
            <span className="whitespace-nowrap font-medium text-[#222829]">
              {item.projectSpecific}
              {item.classes && (
                <>
                  {" "}
                  {item.projectType === "수업" ? (
                    <>
                      <span className="mx-1 font-medium text-[#B7C4C7]">
                        |{" "}
                      </span>
                      {item.classes}분반
                    </>
                  ) : item.projectType === "졸업작품" ? (
                    <>
                      <span className="mx-1 font-medium text-[#B7C4C7]">
                        |{" "}
                      </span>
                      {item.classes} 교수님
                    </>
                  ) : (
                    item.classes
                  )}
                </>
              )}
            </span>

            <img src="/images/Vector.svg" alt="arrow" className="w-3 h-3" />

            <span className="inline-flex items-center max-w-50">
              <span className="font-bold text-sm text-[#222829] shrink-0">
                주제
              </span>

              <span className="mx-2 font-medium text-[#B7C4C7] shrink-0">
                |
              </span>

              <span className="font-medium text-sm text-[#222829] truncate">
                {item.topic}
              </span>
            </span>
          </div>

          {/* 제목 */}
          <h3 className="text-xl font-bold text-[#111827] truncate max-w-140">
            {item.title}
          </h3>
        </div>

        {/* 오른쪽 영역 */}
        <div className="shrink-0 w-105 mr-4">
          <div className="grid grid-cols-[1fr_96px] items-center">
            {/* 이름 + 해시태그 */}
            <div className="flex flex-col items-center">
              <div className="text-base font-medium text-[#222829] whitespace-nowrap">
                {item.name} 학부생
              </div>

              {hasKeyword && (
                <div className="flex gap-2 mt-3">
                  {(item.myKeyword ?? []).slice(0, 2).map((keyword) => (
                    <span
                      key={keyword}
                      className="
                        px-3 py-1.5
                        text-sm
                        rounded
                        outline-1
                        -outline-offset-1
                        outline-[#CEDBDE]
                        text-[#838F91]
                        whitespace-nowrap
                      "
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 날짜 */}
            <div className="text-right text-[#B7C4C7] text-base font-medium">
              {formatRecruitingDate(item.date)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
