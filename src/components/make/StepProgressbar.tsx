'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';
import { StepProgressbarProps } from '@/types/make/i-progress';

const StepProgressbar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  StepProgressbarProps & React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ currentStep, totalSteps, className, ...props }, ref) => {
  // 계산된 progress value (스텝에 따라 증가)
  const progressValue = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-2 w-full overflow-hidden  bg-gray-200',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-orange200 transition-all"
        style={{ transform: `translateX(-${100 - progressValue}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

StepProgressbar.displayName = 'StepProgressbar';

export default StepProgressbar;
