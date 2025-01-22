'use client';

import { useDebounce } from '@/hooks/auth/auth.hook';
import { cn } from '@/lib/utils';
import { TAuthFormValues } from '@/types/auth/auth.type';
import { TError } from '@/types/auth/error.type';
import { ReactNode, useEffect, useId } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import AuthInput from './AuthInput';

interface IAuthLabelWithInput {
  name: keyof TAuthFormValues;
  label: string;
  placeholder: string;
  type: 'text' | 'password';
  registerOptions: RegisterOptions;
  isTextarea?: boolean;
  mutationError: TError | null;
  reset: () => void;
  additionalErrors?: ReactNode;
  className?: string;
  isRequired?: boolean;
}

function AuthLabelWithInput({
  name,
  label,
  placeholder,
  type,
  registerOptions,
  isTextarea,
  additionalErrors,
  mutationError,
  className,
  reset,
  isRequired = true,
}: IAuthLabelWithInput) {
  const id = useId();
  const {
    register,
    setValue,
    trigger,
    setFocus,
    formState: { errors },
  } = useFormContext<TAuthFormValues>();

  // react 18 부터 useTransition 사용 가능(useDeferredValue)
  const debouncedValidation = useDebounce((name: keyof TAuthFormValues) => {
    trigger(name);
  }, 1000);

  const userNotFoundError = mutationError?.code.toLowerCase().includes('user');
  const invalidCredentialsError = mutationError?.code.toLowerCase().includes('invalid');

  useEffect(() => {
    if (userNotFoundError || invalidCredentialsError) setFocus(name);
  }, [userNotFoundError, invalidCredentialsError, name, setFocus]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-body-2-normal font-semibold">
        {label} {isRequired && <span className="text-red200">*</span>}
      </label>
      <AuthInput
        type={type}
        placeholder={placeholder}
        isTextarea={isTextarea}
        className={cn('h-[54px]', className, {
          'focus-visible:ring-error border border-error':
            errors?.[name] || userNotFoundError || invalidCredentialsError || mutationError,
        })}
        name={name}
        id={id}
        register={register(name, {
          ...registerOptions,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            if (mutationError) reset();
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

export default AuthLabelWithInput;
