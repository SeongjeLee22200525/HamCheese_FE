type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div className="w-full px-12 py-10 bg-[#F5F8F8] rounded-lg inline-flex justify-between items-center">
      <p className="text-center justify-start text-2xl font-extrabold font-['Pretendard_Variable'] text-[#222729]">
        팀원으로 적합한 <span className="text-[#00C3CC]">사람</span>을
        찾아보세요!
      </p>

      <div className="gap-2 w-96 p-3 border-b-2 border-[#B7C4C7] inline-flex justify-between items-center">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="outline-none text-sm py-1 text-[#222729] placeholder:text-[#838F91]"
        />
        <image>
            <img src="/images/search-icon.svg" alt="search" />
        </image>
      </div>
    </div>
  );
}
