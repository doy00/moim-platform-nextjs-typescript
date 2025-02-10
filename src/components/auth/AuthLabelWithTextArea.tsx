'use client';

import { useDebounce } from '@/hooks/auth/auth.hook';
import { cn } from '@/lib/utils';
import { TSignUpSchema } from '@/schemas/auth/auth.schema';
import { ReactNode, useId } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import AuthTextArea from './AuthTextArea';

interface IAuthLabelWithTextArea {
  name: keyof TSignUpSchema;
  label: string;
  placeholder: string;
  additionalMessage?: ReactNode;
  className?: string;
  isRequired?: boolean;
  rows?: number;
  mutationReset?: () => void;
}

export default function AuthLabelWithTextArea({
  name,
  label,
  placeholder,
  additionalMessage,
  className,
  rows,
  isRequired = true,
  mutationReset,
}: IAuthLabelWithTextArea) {
  const id = useId();
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<TSignUpSchema>();

  const debouncedValidation = useDebounce((name: keyof TSignUpSchema) => {
    trigger(name);
  }, 600);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-body-2-normal font-semibold">
        {label} {isRequired && <span className="text-red200">*</span>}
      </label>

      <AuthTextArea
        placeholder={placeholder}
        className={cn('h-[54px]', className, {
          'focus-visible:ring-error ring-1 ring-error': errors?.[name],
        })}
        rows={rows}
        name={name}
        id={id}
        register={register(name, {
          onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (errors[name]) mutationReset?.();
            setValue(name, e.target.value);
            debouncedValidation(name);
          },
        } as RegisterOptions<TSignUpSchema, typeof name>)}
      />
      {errors[name] && (
        <p className="text-error text-label-normal font-medium">{errors[name].message}</p>
      )}
      {additionalMessage && additionalMessage}
    </div>
  );
}
