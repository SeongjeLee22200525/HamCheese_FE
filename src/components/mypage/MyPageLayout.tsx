import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import MyProfile from "@/components/mypage/MyProfile";
import { MateProfileInfo } from "@/types/user";

type Props = {
  profile: MateProfileInfo;
  children: React.ReactNode;
};

export default function MyPageLayout({ profile, children }: Props) {
  return (
    <div className="flex flex-col bg-[#F5F8F8]">
      <Header />

      <main className="flex w-full ">
        <div className="pt-5 pl-50 pr-9.5">
          <MyProfile profile={profile} />
        </div>

        {/* 🔥 우측 콘텐츠 카드 */}
        <section className="flex-1 bg-white rounded-lg mt-16 mr-50 mb-30 ">{children}</section>
      </main>
      <Footer />
    </div>
  );
}
