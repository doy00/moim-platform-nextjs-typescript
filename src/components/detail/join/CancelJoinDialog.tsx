import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/detail/Dialog';
import { cn } from '@/utils/detail/cn';

interface ICancelJoinDialog {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const CancelJoinDialog = ({ isOpen, onClose, onConfirm }: ICancelJoinDialog ) => {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          'w-[283px] min-h-45 bg-background400 px-6 py-8 gap-6',
          )}
      >
        <DialogHeader className='space-y-3'>
          <DialogTitle className='flex justify-center items-center text-body-1-normal font-semibold text-gray800'>
            {"모임 신청 취소"}
          </DialogTitle>
          <DialogDescription className='flex justify-center items-center text-body-2-normal font-medium text-gray400'>
            {"정말 모임 신청을 취소하시겠어요?"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex flex-col gap-[7px]'>
          <button
            onClick={onClose}
            className='flex justify-center items-center w-full rounded-lg py-3.5 bg-gray200 text-body-2-normal text-gray500 font-semibold hover:bg-gray200'
          >
            {"닫기"}
          </button>
          <button
            onClick={onConfirm}
            className='flex justify-center items-center w-full rounded-lg py-3.5 bg-gray800 text-body-2-normal text-gray100 font-semibold hover:bg-gray700'
          >
            {"신청 취소하기"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};