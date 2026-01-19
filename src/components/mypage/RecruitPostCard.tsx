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

export default function RecruitingPostCard({ item, onClick }: Props) {
  const hasKeyword = (item.myKeyword ?? []).length > 0;

  return (
    <div
      onClick={() => onClick(item.recruitingId)}
      className="
        w-full
        px-15 py-10
        bg-white
        cursor-pointer
        border-b
        hover:bg-[#F5F8F8]
      "
    >
      <div className="flex items-start justify-between ">
        {/* 왼쪽 영역 */}
        <div className="flex-1 min-w-0">
          {/* 상단 메타 */}
          <div className="flex items-center gap-4 text-sm text-[#222829] flex-wrap">
            <span className="px-3 py-2 rounded bg-[#F5F8F8] text-[#0FA4AB] font-semibold whitespace-nowrap">
              모집인원 {item.recruitPeople} / {item.totalPeople}
            </span>

            <span className="text-[#00C3CC] font-semibold whitespace-nowrap">
              {item.projectType}
            </span>

            <img src="/images/Vector.svg" alt="arrow" className="w-3 h-3" />

            <span className="whitespace-nowrap">
              {item.projectSpecific} {item.classes}분반
            </span>

            <img src="/images/Vector.svg" alt="arrow" className="w-3 h-3" />

            <span className="whitespace-nowrap">
              <span className="font-bold text-[#222829]">주제</span>
              <span className="mx-1 font-medium text-[#B7C4C7]">|</span>
              <span className="font-medium text-[#222829]">{item.topic}</span>
            </span>
          </div>

          {/* 제목 */}
          <h3 className="text-xl font-bold text-[#111827] truncate mt-3">
            {item.title}
          </h3>
        </div>

        {/* 오른쪽 영역 */}
        <div className={`shrink-0 mr-2 ${hasKeyword ? "self-center" : ""}`}>
          {hasKeyword ? (
            /* ✅ 해시태그 있을 때 → 세로 중앙 */
            <div className="flex items-center gap-14">
              {/* 이름 + 해시태그 */}
              <div className="flex flex-col items-center">
                <div className="text-xl font-medium text-[#222829] whitespace-nowrap">
                  {item.name} 학부생
                </div>

                <div className="flex gap-2 mt-3">
                  {(item.myKeyword ?? []).slice(0, 2).map((keyword) => (
                    <span
                      key={keyword}
                      className="
                px-3 py-1
                text-xm
                rounded
                outline
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
              </div>

              {/* 날짜 */}
              <div className="w-24 text-right text-[#B7C4C7] text-base font-medium">
                {formatRecruitingDate(item.date)}
              </div>
            </div>
          ) : (
            /* ❌ 태그 없을 때 → 기존 그대로 */
            <div className="flex items-center gap-14 mt-5.5">
              <div className="text-xl font-medium text-[#222829] whitespace-nowrap">
                {item.name} 학부생
              </div>

              <div className="w-24 text-right text-[#B7C4C7] text-base font-medium">
                {formatRecruitingDate(item.date)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
