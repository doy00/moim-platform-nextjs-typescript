'use client';

import { useDebounce } from '@/hooks/auth/auth.hook';
import { TAuthFormValues } from '@/types/auth/auth.type';
import { cn } from '@/utils/auth/ui.util';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import AuthBar from './AuthBar';
import AuthInput from './AuthInput';
import AuthX from './AuthX';

interface AuthTagsProps {
  signUpError: boolean;
  signUpReset: () => void;
}

export default function AuthTags({ signUpError, signUpReset }: AuthTagsProps) {
  const {
    control,
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<TAuthFormValues>();
  const { fields, append, remove } = useFieldArray<TAuthFormValues, 'tags', 'value'>({
    control,
    name: 'tags',
  });
  // 한글 조합 여부 state
  const [isComposing, setIsComposing] = useState(false);

  const handleAppendTag = () => {
    if (fields.length < 3) append({ value: '' });
  };

  const handleRemoveTag = (index: number) => {
    if (fields.length === 1) return;
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
    if ((e.nativeEvent as any).isComposing || isComposing) {
      return;
    }
    if (errors.tags) return;
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      handleAppendTag();
    }
  };

  const debouncedValidation = useDebounce((name: keyof TAuthFormValues) => {
    trigger(name);
  }, 600);

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
        {fields.map((field, index) => (
          <AuthInput
            key={field.id}
            type="text"
            placeholder="# 태그추가"
            name={`tags.${index}.value`}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleComposition}
            onCompositionEnd={handleComposition}
            isArray
            className={cn(
              'h-[34px] w-[88px] text-xs',
              (errors.tags || signUpError) && 'focus-visible:ring-error',
            )}
            register={register(`tags.${index}.value` as const, {
              maxLength: {
                value: 5,
                message: '최대 5글자까지 입력 가능해요',
              },
              onChange: (e) => {
                if (signUpError) signUpReset();
                setValue(`tags.${index}.value`, e.target.value);
                debouncedValidation(`tags`);
              },
            })}
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
      {errors.tags ? (
        <p className="text-error text-label-normal font-medium">최대 5글자까지 입력 가능해요</p>
      ) : (
        <p className="text-label-normal text-gray300 font-semibold">최대 5글자까지 입력 가능해요</p>
      )}
    </div>
  );
}
