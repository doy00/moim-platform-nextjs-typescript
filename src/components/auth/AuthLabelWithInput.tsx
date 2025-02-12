'use client';

import { useDebounce } from '@/hooks/auth/auth.hook';
import { cn } from '@/lib/utils';
import { TSignUpSchema } from '@/schemas/auth/auth.schema';
import { ReactNode, useEffect, useId } from 'react';
import { get, Path, PathValue, useFormContext } from 'react-hook-form';
import AuthInput from './AuthInput';
import AuthPasswordInput from './AuthPasswordInput';

interface IAuthLabelWithInput {
  name: Path<TSignUpSchema>;
  label: string;
  placeholder: string;
  additionalMessage?: ReactNode;
  // registerOptions?: RegisterOptions<TSignUpSchema>;
  className?: string;
  isRequired?: boolean;
  isPassword?: boolean;
  mutationReset?: () => void;
}

export default function AuthLabelWithInput({
  name,
  label,
  placeholder,
  additionalMessage,
  // registerOptions,
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
    setFocus,
    formState: { errors },
  } = useFormContext<TSignUpSchema>();

  const debouncedValidation = useDebounce((name: keyof TSignUpSchema) => {
    trigger(name);
  }, 600);

  useEffect(() => {
    if (errors[name as keyof TSignUpSchema]) {
      setFocus(name);
    }
  }, [errors, name, setFocus]);

  const error = get(errors, name);

  return (
    <div className="flex flex-col gap-2 min-h-[108px]">
      <label htmlFor={id} className="text-body-2-normal font-semibold">
        {label} {isRequired && <span className="text-red200">*</span>}
      </label>
      {isPassword ? (
        <AuthPasswordInput
          placeholder={placeholder}
          className={cn('h-[54px]', className, {
            'focus-visible:ring-error ring-1 ring-error': error,
          })}
          name={name}
          id={id}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (error) mutationReset?.();
            setValue(name, e.target.value as PathValue<TSignUpSchema, Path<TSignUpSchema>>);
            debouncedValidation(name as keyof TSignUpSchema);
          }}
        />
      ) : (
        <AuthInput
          placeholder={placeholder}
          className={cn('h-[54px]', className, {
            'focus-visible:ring-error ring-1 ring-error': error,
          })}
          name={name}
          id={id}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (error) mutationReset?.();
            setValue(name, e.target.value as PathValue<TSignUpSchema, Path<TSignUpSchema>>);
            debouncedValidation(name as keyof TSignUpSchema);
          }}
        />
      )}
      {error && <p className="text-error text-label-normal font-medium">{error.message}</p>}
      {additionalMessage && additionalMessage}
    </div>
  );
}

// react 18 부터 useTransition 사용 가능(useDeferredValue)
// const deferredValue = useDeferredValue(watch(name));
// const debouncedValidation = (name: keyof TAuthFormValues) => {
//   console.log('debouncedValidation');
//   if (deferredValue) trigger(name);
// };
