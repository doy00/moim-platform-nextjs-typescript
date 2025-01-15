import { useState } from 'react';

type TReviewTab = '작성 가능한 리뷰' | '작성한 리뷰';

export default function ReviewTabs() {
  const [click, setClick] = useState<TReviewTab>('작성 가능한 리뷰');

  const handleClick = (tab: TReviewTab) => {
    setClick(tab);
  };

  const getButtonStyle = (tab: TReviewTab) => {
    return `w-1/2 rounded-xl px-4 py-3  text-label-nomal font-semibold ${
      click === tab ? 'bg-background100 text-gray800' : 'bg-none text-gray300'
    }`;
  };

  return (
    <div className="flex bg-background400 rounded-2xl p-1">
      <div className="flex justify-between items-center w-full gap-1.5">
        <button
          onClick={() => handleClick('작성 가능한 리뷰')}
          className={getButtonStyle('작성 가능한 리뷰')}
        >
          작성 가능한 리뷰
        </button>
        <button
          onClick={() => handleClick('작성한 리뷰')}
          className={getButtonStyle('작성한 리뷰')}
        >
          작성한 리뷰
        </button>
      </div>
    </div>
  );
}
