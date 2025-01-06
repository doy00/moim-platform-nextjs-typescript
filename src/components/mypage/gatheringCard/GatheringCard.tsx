export default function GatheringCard() {
  return (
    <div className="flex items-center gap-4">
      <div className="w-[280px] h-[156px] rounded-3xl border bg-gray-100" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span>모임명</span>
          <span>⎮</span>
          <span>위치</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>날짜 ∙ 시간</span>
          <span>인원수</span>
        </div>
      </div>
    </div>
  );
}
