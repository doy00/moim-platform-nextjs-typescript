'use client';

import { cn } from '@/utils/ui.util';
import { InputHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Eye from './Eye';
import EyeSlash from './EyeSlash';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register: UseFormRegisterReturn;
}

function Input({ className, type, register, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="relative flex items-center w-full">
      <input
        type={type === 'password' && showPassword ? 'text' : type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
        {...register}
      />
      {type === 'password' && (
        <div
          className="absolute right-3 cursor-pointer text-muted-foreground"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <Eye /> : <EyeSlash />}
        </div>
      )}
    </div>
  );
}

export default Input;
