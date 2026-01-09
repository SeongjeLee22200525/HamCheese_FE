import { Recruiting } from "@/types/recruiting";
import RecruitingCard from "./RecruitingCard";

type Props = {
  items: Recruiting[];
  onClickItem: (id: number) => void;
};

export default function RecruitingList({ items, onClickItem }: Props) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <RecruitingCard
          key={item.recruitingId}
          item={item}
          onClick={onClickItem}
        />
      ))}
    </div>
  );
}
