'use client';

import { useDebounce } from '@/hooks/auth/auth.hook';
import { cn } from '@/lib/utils';
import { TAuthFormValues } from '@/types/auth/auth.type';
import { ReactNode, useId } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import AuthTextArea from './AuthTextArea';

interface IAuthLabelWithTextArea {
  name: keyof TAuthFormValues;
  label: string;
  placeholder: string;
  registerOptions: RegisterOptions;
  additionalErrors?: ReactNode;
  className?: string;
  isRequired?: boolean;
  rows?: number;
  mutationReset?: () => void;
}

export default function AuthLabelWithTextArea({
  name,
  label,
  placeholder,
  registerOptions,
  additionalErrors,
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
  } = useFormContext<TAuthFormValues>();

  const debouncedValidation = useDebounce((name: keyof TAuthFormValues) => {
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
          ...registerOptions,
          onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (errors[name]) mutationReset?.();
            setValue(name, e.target.value);
            debouncedValidation(name);
          },
        } as RegisterOptions<TAuthFormValues, typeof name>)}
      />
      {errors[name] && (
        <p className="text-error text-label-normal font-medium">{errors[name].message}</p>
      )}
      {additionalErrors && additionalErrors}
    </div>
  );
}
