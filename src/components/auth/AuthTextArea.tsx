import { cn } from '@/utils/auth/ui.util';
import { TextareaHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface AuthTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  register: UseFormRegisterReturn;
}

function AuthTextArea({ className, register, ...props }: AuthTextAreaProps) {
  return (
    <div className="relative flex items-center w-full">
      <textarea
        className={cn(
          'flex h-10 w-full rounded-xl border border-input bg-background400 p-3 text-sm border-none file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-gray200 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-body-2-normal placeholder:text-gray300 placeholder:font-medium resize-none',
          className,
        )}
        {...props}
        {...register}
      />
    </div>
  );
}

export default AuthTextArea;
