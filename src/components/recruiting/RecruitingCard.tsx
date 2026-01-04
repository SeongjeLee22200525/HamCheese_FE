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
  return (
    <div
      onClick={() => onClick(item.recruitingId)}
      className="
        w-full
        border border-[#E6EEF0]
        rounded-xl
        px-8 py-10
        bg-white
        cursor-pointer
      "
    >
      <div className="flex items-start">
        {/* 왼쪽 영역 */}
        <div className="flex-1">
          <div className="flex items-center gap-3 text-sm text-[#6B7280] mb-3">
            <span className="px-2 py-1 rounded bg-[#EEF7F8] text-[#0FA4AB] font-semibold">
              모집인원 {item.recruitPeople} / {item.totalPeople}
            </span>

            <span className="text-[#00AEB5] font-semibold">
              {item.projectType}
            </span>

            <span className="text-[#D1D5DB]">
              <img src="/images/Vector.svg" alt="arrow" className="w-3 h-3" />
            </span>

            <span>
              {item.projectSpecific} {item.classes}분반
            </span>

            <span className="text-[#D1D5DB]">
              <img src="/images/Vector.svg" alt="arrow" className="w-3 h-3" />
            </span>

            <span>
              <span className="font-bold text-[#222829]">주제</span>
              <span className="mx-1 font-medium text-[#B7C4C7]">|</span>
              <span className="font-medium text-[#222829]">{item.topic}</span>
            </span>
          </div>

          <h3 className="text-xl font-bold text-[#111827]">{item.title}</h3>
        </div>

        {/* 오른쪽 영역 (이름 / 해시태그 / 시간) */}
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-end">
            {/* 이름 */}
            <div className="text-sm font-medium text-[#222829] mb-2">
              {item.name} 학부생
            </div>

            {/* 해시태그 (최대 2개) */}
            <div className="flex gap-2 mb-2">
              {(item.myKeyword ?? []).slice(0, 2).map((keyword) => (
                <span
                  key={keyword}
                  className="
                    px-2 py-1
                    text-xs
                    rounded
                    border
                    border-[#E5E7EB]
                    text-[#838F91]
                  "
                >
                  #{keyword}
                </span>
              ))}
            </div>

            {/* 날짜 / 시간 */}
            <div className="text-xs text-[#B7C4C7]">
              {formatRecruitingDate(item.date)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
