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
        px-8 py-6
        bg-white
        cursor-pointer
      "
    >
      <div className="flex items-start">
        {/* ================= 왼쪽 ================= */}
        <div className="flex-1">
          {/* 메타 정보 */}
          <div className="flex items-center gap-3 text-sm text-[#6B7280] mb-3">
            <span className="px-2 py-1 rounded bg-[#EEF7F8] text-[#00AEB5] font-semibold">
              모집인원 {item.recruitPeople} / {item.totalPeople}
            </span>

            <span className="text-[#00AEB5] font-semibold">
              {item.projectType}
            </span>

            <span>
              {item.projectSpecific} {item.classes}분반
            </span>

            <span className="text-[#D1D5DB]">›</span>

            <span>주제 {item.topic}</span>
          </div>

          {/* 제목 */}
          <h3 className="text-lg font-bold text-[#111827]">{item.title}</h3>
        </div>

        {/* ================= 오른쪽 ================= */}
        <div className="ml-10 text-right">
          {/* 이름 */}
          <div className="text-sm font-medium text-[#111827] mb-3">
            {item.name} 학부생
          </div>

          {/* 태그 */}
          <div className="flex justify-end gap-2 mb-3">
            {item.skillList.map((skill) => (
              <span
                key={skill}
                className="
                  px-2 py-1
                  text-xs
                  rounded
                  border
                  border-[#E5E7EB]
                  text-[#6B7280]
                "
              >
                #{skill}
              </span>
            ))}
          </div>
        </div>
        {/* 날짜 */}
        <div className="text-sm text-[#6B7280]">{item.date}</div>
      </div>
    </div>
  );
}
