'use client';

import { useDebounce } from '@/hooks/auth/auth.hook';
import { cn } from '@/lib/utils';
import { TAuthFormValues } from '@/types/auth/auth.type';
import { ReactNode, useId } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import AuthInput from './AuthInput';
import AuthPasswordInput from './AuthPasswordInput';

interface IAuthLabelWithInput {
  name: keyof TAuthFormValues;
  label: string;
  placeholder: string;
  registerOptions: RegisterOptions;
  additionalErrors?: ReactNode;
  className?: string;
  isRequired?: boolean;
  isPassword?: boolean;
  mutationReset?: () => void;
}

export default function AuthLabelWithInput({
  name,
  label,
  placeholder,
  registerOptions,
  additionalErrors,
  className,
  isRequired = true,
  isPassword = false,
  mutationReset,
}: IAuthLabelWithInput) {
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
      {isPassword ? (
        <AuthPasswordInput
          placeholder={placeholder}
          className={cn('h-[54px]', className, {
            'focus-visible:ring-error ring-1 ring-error': errors?.[name],
          })}
          name={name}
          id={id}
          register={register(name, {
            ...registerOptions,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              if (errors[name]) mutationReset?.();
              setValue(name, e.target.value);
              debouncedValidation(name);
            },
          } as RegisterOptions<TAuthFormValues, typeof name>)}
        />
      ) : (
        <AuthInput
          placeholder={placeholder}
          className={cn('h-[54px]', className, {
            'focus-visible:ring-error ring-1 ring-error': errors?.[name],
          })}
          name={name}
          id={id}
          register={register(name, {
            ...registerOptions,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              if (errors[name]) mutationReset?.();
              setValue(name, e.target.value);
              debouncedValidation(name);
            },
          } as RegisterOptions<TAuthFormValues, typeof name>)}
        />
      )}
      {errors[name] && (
        <p className="text-error text-label-normal font-medium">{errors[name].message}</p>
      )}
      {additionalErrors && additionalErrors}
    </div>
  );
}

// react 18 부터 useTransition 사용 가능(useDeferredValue)
// const deferredValue = useDeferredValue(watch(name));
// const debouncedValidation = (name: keyof TAuthFormValues) => {
//   console.log('debouncedValidation');
//   if (deferredValue) trigger(name);
// };
