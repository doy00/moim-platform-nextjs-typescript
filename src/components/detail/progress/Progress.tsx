// Progress.tsx
/**  shadcn progress 바 컴포넌트
 * - progressColor prop 추가하여 Indicator의 배경색을 외부에서 제어할 수 있게 변경
 * - Framer Motion 적용
 */
"use client"
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/utils/detail/cn"
import { motion } from "framer-motion"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
  & {
    progressColor?: string;   // Indicator의 배경색을 제어하기위해 prop 추가
    animate?: boolean;        // 애니메이션 적용을 위해 prop 추가
    springConfig?: {
      type: string;
      stiffness: number;
      damping: number;
      mass: number;
    }
  }
>(({ className, value, progressColor, springConfig, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-full w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <motion.div
      className={cn("h-full w-full flex-1", progressColor || "bg-primary")}
      initial={{ x: "-100%" }}
      animate={{ x: `${-100 + (value || 0)}%`}}
      transition={springConfig || {
        type: "spring",
        stiffness: 60,
        damping: 15,
        mass: 1,
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
