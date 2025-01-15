import Header from '@/components/mypage/header/Header';
import MyProfile from '@/components/mypage/myprofile/MyProfile';
import RenderTab from '@/components/mypage/renderTab/RenderTab';

export default async function MypageContainer() {
  return (
    <div className="h-screen max-w-[1200px] flex flex-col gap-4">
      <Header />
      <MyProfile />
      <RenderTab />
    </div>
  );
}
