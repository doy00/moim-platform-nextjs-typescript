import { useState } from 'react';

interface TagInputProps {
  tags: string[];
  onTagsChange: (newTags: string[]) => void;
}

export default function TagInput({ tags, onTagsChange }: TagInputProps) {
  const [tagInputValue, setTagInputValue] = useState('');
  const [isTagInputExceeded, setIsTagInputExceeded] = useState(false);
  const [isTagTextExceeded, setIsTagTextExceeded] = useState(false);
  const [isTagIncludeExceeded, setIsTagIncludeExceeded] = useState(false);

  const handleRemoveTag = (indexToRemove: number) => {
    onTagsChange(tags?.filter((_, index) => index !== indexToRemove) || []);
    setIsTagInputExceeded(false);
    setIsTagTextExceeded(false);
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.nativeEvent.isComposing) return;

      const newTag = tagInputValue.trim();

      if (tags.length === 3) {
        setIsTagInputExceeded(true);
        return;
      }
      setIsTagInputExceeded(false);

      if (newTag.length > 5) {
        setIsTagTextExceeded(true);
        return;
      }
      setIsTagTextExceeded(false);

      if (tags.includes(newTag)) {
        setIsTagIncludeExceeded(true);
        return;
      }
      setIsTagIncludeExceeded(false);

      if (newTag && !tags.includes(newTag)) {
        onTagsChange([...tags, newTag]);
        setTagInputValue('');
      }
    }
  };

  const tagExceeded = (() => {
    if (isTagInputExceeded) {
      return (
        <span className="text-label-normal font-medium text-error">최대 3개까지 입력 가능해요</span>
      );
    }
    if (isTagTextExceeded) {
      return (
        <span className="text-label-normal font-medium text-error">
          최대 5글자까지 입력 가능해요
        </span>
      );
    }
    if (isTagIncludeExceeded) {
      return <span className="text-label-normal font-medium text-error">이미 추가된 태그에요</span>;
    }
    return (
      <span className="text-label-normal font-medium text-gray300">
        최대 5글자까지 입력 가능해요
      </span>
    );
  })();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label htmlFor="tag" className="text-body-2-nomal font-medium text-gray-800">
          태그
        </label>
        <div className="flex items-center gap-1.5">
          <span className="text-gray600 font-medium text-caption-normal">{tags.length}</span>
          <hr className="w-[1px] h-1.5 bg-gray300" />
          <span className="text-gray300 font-medium text-caption-normal">3</span>
        </div>
      </div>
      <div className="relative flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            id="tag"
            value={tagInputValue}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (inputValue.length <= 5) {
                setTagInputValue(inputValue);
                setIsTagTextExceeded(false);
              } else {
                setIsTagTextExceeded(true);
              }
            }}
            onKeyDown={handleTagInput}
            placeholder="# 태그추가"
            className="flex gap-2 items-center rounded-xl px-4 py-2 bg-background400 outline-none text-caption-normal font-medium placeholder:text-gray300 w-[90px]"
          />
          {tags?.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 bg-background400 rounded-xl justify-between"
            >
              <span className="inline-flex items-center text-caption-normal font-medium text-gray600">
                # {tag}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveTag(index)}
                className="text-gray600 hover:text-gray950"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {tagExceeded}
      </div>
    </div>
  );
}
