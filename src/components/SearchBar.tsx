export default function SearchBar({
  value,
  onChange,
  placeholder,
  title,
}: Props) {
  return (
    <div className="w-full px-12 py-5 bg-[#F5F8F8] rounded-lg inline-flex justify-between items-center">
      <p className="text-[24px] font-extrabold text-[#222729]">
        {title}
      </p>

      <div className="gap-2 w-96 p-3 border-b-2 border-[#B7C4C7] inline-flex justify-between items-center">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full outline-none text-[16px] py-1 text-[#222729] placeholder:text-[#838F91]"
        />
        <img src="/images/search-icon.svg" alt="search" />
      </div>
    </div>
  );
}
