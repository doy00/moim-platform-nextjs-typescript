import Header from '@/components/mypage/header/Header';
import MyProfile from '@/components/mypage/myprofile/MyProfile';
import RenderTab from '@/components/mypage/renderTab/RenderTab';

export default async function MypageContainer() {
  return (
    <div className="h-auto flex flex-col gap-4 mx-auto sm:px-6 sm:max-w-screen-sm md:px-8 md:max-w-screen-md lg:px-12 lg:max-w-screen-lg xl:px-16 xl:max-w-screen-xl">
      <Header />
      <div className="w-full lg:max-w-[960px] mx-auto">
        <MyProfile />
        <RenderTab />
      </div>
    </div>
  );
}
