import { cn } from '@/utils/auth/ui.util';
import { ButtonHTMLAttributes } from 'react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function AuthButton({ children, className, onClick, ...props }: AuthButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-row items-center justify-center w-full h-[58px] bg-gray100 rounded-[20px] gap-3',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
