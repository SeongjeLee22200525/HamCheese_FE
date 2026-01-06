type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder: string;
  title: string;
};

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder,
  title,
}: Props) {
  return (
    <div className="w-full px-12 py-10 bg-[#F5F8F8] rounded-lg inline-flex justify-between items-center">
      <p className="text-[24px] font-extrabold text-[#222729]">
        {title}
      </p>

      <div className="gap-2 w-96 p-3 border-b-2 border-[#B7C4C7] inline-flex items-center">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(); // Enter 키 검색
            }
          }}
          placeholder={placeholder}
          className="w-full outline-none text-[16px] py-1 text-[#222729] placeholder:text-[#838F91]"
        />

        {/* 검색 버튼 */}
        <button
          type="button"
          onClick={onSearch}
          className="shrink-0"
        >
          <img
            src="/images/search-icon.svg"
            alt="search"
            className="cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}
