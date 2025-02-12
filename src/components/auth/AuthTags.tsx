'use client';

import { useDebounce } from '@/hooks/auth/auth.hook';
import { TSignUpSchema } from '@/schemas/auth/auth.schema';
import { TAuthFormValues } from '@/types/auth/auth.type';
import { cn } from '@/utils/auth/ui.util';
import { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import AuthInput from './AuthInput';
import { AuthBar, AuthX } from './icons';

interface AuthTagsProps {
  signUpError: boolean;
  signUpReset: () => void;
}

export default function AuthTags({ signUpError, signUpReset }: AuthTagsProps) {
  const {
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<TSignUpSchema>();
  const { fields, append, remove } = useFieldArray<TSignUpSchema, 'tags', 'id'>({
    control,
    name: 'tags',
  });
  // 한글 조합 여부 state
  const [tagInputValue, setTagInputValue] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [isTagInputExceeded, setIsTagInputExceeded] = useState(false);

  const handleAppendTag = () => {
    if (fields.length < 3) append({ value: tagInputValue });
    else setIsTagInputExceeded(true);
  };

  const handleRemoveTag = (index: number) => {
    remove(index);
  };

  // onCompositionStart / onCompositionEnd 이벤트 핸들러
  const handleComposition = (e: React.CompositionEvent<HTMLInputElement>) => {
    if (e.type === 'compositionstart') {
      setIsComposing(true);
    } else if (e.type === 'compositionend') {
      setIsComposing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 한글 조합 중이라면 조합 완료 후에만 Enter/Tab 동작 처리
    if ((e.nativeEvent as any).isComposing || isComposing) return;
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      if (signUpError) signUpReset();
      setValue(`tags.${fields.length - 1}.value`, tagInputValue);
      debouncedValidation(`tags`);
      if (tagInputValue.length > 5) return;
      handleAppendTag();
      setTagInputValue('');
    }
  };

  const debouncedValidation = useDebounce((name: keyof TAuthFormValues) => {
    trigger(name);
  }, 600);

  useEffect(() => {
    if (!isTagInputExceeded) return;
    setTimeout(() => {
      setIsTagInputExceeded(false);
    }, 1000);
  }, [isTagInputExceeded]);

  const tagExceeded = (() => {
    if (isTagInputExceeded) {
      return (
        <span className="text-label-normal font-medium text-error">최대 3개까지 입력 가능해요</span>
      );
    }
    if (errors.tags) {
      return (
        <span className="text-label-normal font-medium text-error">
          최대 5글자까지 입력 가능해요
        </span>
      );
    }
    return (
      <span className="text-label-normal font-medium text-gray300">
        최대 5글자까지 입력 가능해요
      </span>
    );
  })();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <label className="text-body-2-normal font-medium">태그</label>
        <p className="text-body-2-normal font-medium flex items-center gap-1">
          <span className="text-gray600">{fields.length}</span>
          <AuthBar />
          <span className="text-gray300">3</span>
        </p>
      </div>
      <div className="flex flex-row gap-2">
        <input
          type="text"
          id="tag"
          value={tagInputValue}
          onChange={(e) => setTagInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleComposition}
          onCompositionEnd={handleComposition}
          placeholder="# 태그추가"
          className="flex gap-2 items-center rounded-xl px-4 py-2 bg-background400 outline-none text-gray700 text-caption-normal font-medium placeholder:text-gray300 w-[90px]"
        />
        {fields.map((field, index) => (
          <AuthInput
            key={field.id}
            id={field.id}
            type="text"
            placeholder="# 태그추가"
            defaultValue={`# ${field.value}`}
            name={`tags.${index}.value`}
            isArray
            className={cn(
              'h-[34px] w-[88px] text-xs font-medium',
              (errors.tags || signUpError) && 'focus-visible:ring-error',
            )}
          >
            <button
              type="button"
              className="absolute right-3 cursor-pointer text-muted-foreground"
              onClick={() => handleRemoveTag(index)}
            >
              <AuthX className="w-2 h-2 text-gray300" />
            </button>
          </AuthInput>
        ))}
      </div>
      {tagExceeded}
    </div>
  );
}
