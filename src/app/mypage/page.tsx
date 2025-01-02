import Meetings from '../../components/mypage/meetings/Meetings';

export default function Mypage() {
  return (
    <div className="h-screen max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold ">마이페이지</h1>
        {/* 내 프로필 구간 */}
        <div className="flex flex-col border-2 border-gray-300 rounded-md p-4 gap-4">
          <div className="flex items-center justify-between ">
            <h2 className="text-xl font-bold">내 정보</h2>
            <button className="rounded-full bg-gray-400">프로필 수정</button>
          </div>
          <hr />
          <div className="flex gap-4">
            <div>profile img</div>
            <div className="flex flex-col gap-2">
              <span>닉네임</span>
              <span>회사</span>
              <span>이메일</span>
            </div>
          </div>
        </div>
        <Meetings />
      </div>
    </div>
  );
}
