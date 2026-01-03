"use client";

type Props = {
  tabTitle: string;
  children: React.ReactNode;
};

export default function ProfileSection({ tabTitle, children }: Props) {
  return (
    <section className="relative">
      {/* ===== 사다리꼴 탭 ===== */}
      <div className="profile-tab-wrap">
        <div className="profile-tab">
          <span className="profile-tab-text">{tabTitle}</span>
        </div>
      </div>

      {/* ===== 내용 박스 ===== */}
      <div className="bg-white rounded-b-lg rounded-tr-lg shadow-[0px_2px_4px_0px_rgba(225,237,240,1.00)]">
        {children}
      </div>
    </section>
  );
}
