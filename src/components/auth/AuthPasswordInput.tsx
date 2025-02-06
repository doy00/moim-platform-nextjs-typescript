'use client';

import { cn } from '@/utils/auth/ui.util';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AuthEye, AuthEyeSlash } from './icons';

interface AuthPasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  register: UseFormRegisterReturn;
  children?: React.ReactNode;
}

export default function AuthPasswordInput({
  className,
  register,
  children,
  ...props
}: AuthPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={cn('relative flex items-center w-full')}>
      <input
        type={showPassword ? 'text' : 'password'}
        className={cn(
          'flex h-10 w-full rounded-xl border border-input bg-background400 px-3 py-2 text-sm border-none file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-gray200 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-body-2-normal placeholder:text-gray300 placeholder:font-medium',
          className,
        )}
        {...props}
        {...register}
      />
      <div
        className="absolute right-3 cursor-pointer text-muted-foreground"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <AuthEye className="text-gray300" />
        ) : (
          <AuthEyeSlash className="text-gray300" />
        )}
      </div>
      {children}
    </div>
  );
}
