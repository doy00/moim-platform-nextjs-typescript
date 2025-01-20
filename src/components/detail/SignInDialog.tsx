import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ISignInDialog {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInDialog = ({ isOpen, onClose }: ISignInDialog ) => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/auth/signin');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-[283px] min-h-45 bg-background400 px-6 py-8 gap-6'>
        <DialogHeader className='space-y-3'>
          <DialogTitle className='flex justify-center items-center text-body-1-normal font-semibold text-gray800'>
            {"로그인 후 이용하실 수 있어요"}
          </DialogTitle>
          <DialogDescription className='flex justify-center items-center text-body-2-normal font-medium text-gray400'>
            {"카카오로 3초만에 가능해요"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex flex-col gap-[7px]'>
          <button
            onClick={onClose}
            className='flex justify-center items-center w-full rounded-lg py-3.5 bg-gray200 text-body-2-normal text-gray500 font-semibold hover:bg-gray200'
          >
            {"괜찮아요"}
          </button>
          <button
            onClick={handleSignIn}
            className='flex justify-center items-center w-full rounded-lg py-3.5 bg-gray800 text-body-2-normal text-gray100 font-semibold hover:bg-gray700'
          >
            {"로그인하기"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};