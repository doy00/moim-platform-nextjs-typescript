'use client';

import { useDebounce } from '@/hooks/auth/auth.hook';
import { TAuthFormValues } from '@/types/auth/auth.type';
import { cn } from '@/utils/auth/ui.util';
import { useId } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import AuthBar from './AuthBar';
import AuthInput from './AuthInput';
import AuthX from './AuthX';

interface AuthTagsProps {
  signUpError: boolean;
  signUpReset: () => void;
}

export default function AuthTags({ signUpError, signUpReset }: AuthTagsProps) {
  const tagsId = useId();
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

  const handleAppendTag = () => {
    if (fields.length < 3) append({ id: fields.length, value: '' });
  };

  const handleRemoveTag = (index: number) => {
    if (fields.length === 1) return;
    remove(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        <label htmlFor={tagsId} className="text-body-2-normal font-medium">
          태그
        </label>
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
            isArray
            id={tagsId}
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
