type Props = {
  active: boolean;
};

export default function TabSvg({ active }: Props) {
  return (
    <svg
      width="240"
      height="60"
      viewBox="0 0 240 60"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H205.708C210.462 0 214.768 2.80666 216.687 7.15632L240 60H0V4Z"
        fill={active ? "#00C3CC" : "#E6EEF0"}
      />
    </svg>
  );
}
