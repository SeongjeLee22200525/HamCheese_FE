import { Recruiting } from "@/types/recruiting";
import RecruitingCard from "./RecruitingCard";

type Props = {
  items: Recruiting[];
  onClickItem: (id: number) => void;
};

export default function RecruitingList({ items, onClickItem }: Props) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-400">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {items.map(item => (
        <RecruitingCard
          key={item.recruitingId}
          item={item}
          onClick={onClickItem}
        />
      ))}
    </div>
  );
}
