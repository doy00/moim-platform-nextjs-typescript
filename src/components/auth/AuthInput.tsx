'use client';

import { cn } from '@/utils/auth/ui.util';
import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name: string;
  register: UseFormRegisterReturn;
  isArray?: boolean;
  children?: React.ReactNode;
}

export default function AuthInput({
  className,
  register,
  isArray,
  children,
  ...props
}: AuthInputProps) {
  return (
    <div className={cn('relative flex items-center w-full', isArray && 'w-auto')}>
      <input
        type="text"
        className={cn(
          'flex h-10 w-full rounded-xl border border-input bg-background400 px-3 py-2 text-sm border-none file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-gray200 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-body-2-normal placeholder:text-gray300 placeholder:font-medium',
          className,
        )}
        {...props}
        {...register}
      />
      {children}
    </div>
  );
}
