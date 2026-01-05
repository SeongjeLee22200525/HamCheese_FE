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
        border border-[#E6EEF0]
        rounded-xl
        px-10 py-10
        bg-white
        cursor-pointer
      "
    >
      {/* 🔥 핵심: items-center */}
      <div className="flex items-center justify-between gap-8">
        {/* 왼쪽 영역 */}
        <div className="flex-1 min-w-0 pl-2">
          {/* 상단 메타 */}
          <div className="flex items-center gap-3 text-sm text-[#6B7280] mb-3 flex-wrap">
            <span className="px-2 py-1 rounded bg-[#F5F8F8] text-[#0FA4AB] font-semibold whitespace-nowrap">
              모집인원 {item.recruitPeople} / {item.totalPeople}
            </span>

            <span className="text-[#00AEB5] font-extrabold whitespace-nowrap">
              {item.projectType}
            </span>

            <img src="/images/Vector.svg" alt="arrow" className="w-3 h-3" />

            <span className="whitespace-nowrap font-medium text-[#222829]">
              {item.projectSpecific} {item.classes}분반
            </span>

            <img src="/images/Vector.svg" alt="arrow" className="w-3 h-3" />

            <span className="whitespace-nowrap">
              <span className="font-bold text-[#222829]">주제</span>
              <span className="mx-1 font-medium text-[#B7C4C7]">|</span>
              <span className="font-medium text-[#222829]">
                {item.topic}
              </span>
            </span>
          </div>

          {/* 제목 */}
          <h3 className="text-xl font-bold text-[#111827] truncate">
            {item.title}
          </h3>
        </div>

        {/* 오른쪽 영역 */}
        <div className="shrink-0 mr-2">
          {hasKeyword ? (
            /* 해시태그 있을 때 */
            <div className="flex items-center gap-14">
              <div className="flex flex-col items-center">
                <div className="text-xl font-medium text-[#222829] whitespace-nowrap">
                  {item.name} 학부생
                </div>

                <div className="flex gap-2 mt-3">
                  {(item.myKeyword ?? []).slice(0, 2).map(keyword => (
                    <span
                      key={keyword}
                      className="
                        px-3 py-1
                        text-xm
                        rounded
                        outline
                        outline-1
                        outline-offset-[-1px]
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

              <div className="w-24 flex items-center justify-end text-[#B7C4C7] text-base font-medium">
                {formatRecruitingDate(item.date)}
              </div>
            </div>
          ) : (
            /* 해시태그 없을 때 */
            <div className="flex items-center gap-14">
              <div className="text-xl font-medium text-[#222829] whitespace-nowrap">
                {item.name} 학부생
              </div>

              <div className="w-24 flex items-center justify-end text-[#B7C4C7] text-base font-medium">
                {formatRecruitingDate(item.date)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
