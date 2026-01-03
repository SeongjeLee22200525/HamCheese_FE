import { Recruiting } from "@/types/recruiting";

type Props = {
  item: Recruiting;
  onClick: (id: number) => void;
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
        {/* 왼쪽 */}
        <div className="flex-1">
          {/* 메타 정보 */}
          <div className="flex items-center gap-3 text-sm text-[#6B7280] mb-3">
            <span className="px-2 py-1 rounded bg-[#EEF7F8] text-[#0FA4AB] font-semibold">
              모집인원 {item.recruitPeople} / {item.totalPeople}
            </span>

            <span className="text-[#00AEB5] font-semibold">
              {item.projectType}
            </span>

            <span className="text-[#D1D5DB]"><img src="/images/Vector.svg" alt="arrow" className="w-3 h-3" /></span>

            <span>
              {item.projectSpecific} {item.classes}분반
            </span>

            <span className="text-[#D1D5DB]"><img src="/images/Vector.svg" alt="arrow" className="w-3 h-3" /></span>

            <span>
              <span className="font-bold text-[#222829]">주제</span>
              <span className="mx-1 font-medium text-[#B7C4C7]">|</span>
              <span className="font-medium text-[#222829]">{item.topic}</span>
            </span>
          </div>

          {/* 제목 */}
          <h3 className="text-xl font-bold text-[#111827]">{item.title}</h3>
        </div>

        {/* 오른쪽 전체 묶음 */}
        <div className="flex items-center gap-10">
          {/* 이름 + 태그 */}
          <div className="flex flex-col items-center">
            {/* 이름 */}
            <div className="text-center text-l font-medium text-[#222829] mb-2">
              {item.name} 학부생
            </div>

            {/* 태그 */}
            <div className="flex gap-2">
              {item.skillList.map((skill) => (
                <span
                  key={skill}
                  className="
            px-2 py-1
            text-xs
            rounded
            border
            border-[#E5E7EB]
            text-[#838F91]
          "
                >
                  #{skill}
                </span>
              ))}
            </div>
          </div>

          {/* 날짜 */}
          <div className="text-sm text-[#B7C4C7]">{item.date}</div>
        </div>
      </div>
    </div>
  );
}
