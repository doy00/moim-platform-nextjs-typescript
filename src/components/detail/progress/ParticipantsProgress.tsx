// ParticipantsProgress.tsx
// 모임 참여 현황을 알 수 있는 Progress Bar 컴포넌트입니다.
import * as React from 'react';
import { motion } from 'framer-motion';
import { Progress } from './Progress';
import { FireIcon } from '../icons/FireIcon';

interface IParticipantsProgressProps {
  currentCount: number;
  minParticipants: number;
  maxParticipants: number;
  className?: string;
}

export const ParticipantsProgressA: React.FC<IParticipantsProgressProps> = ({
  currentCount,
  minParticipants,
  maxParticipants,
  className
}) => {

  const targetProgress = (currentCount / maxParticipants) * 100;  // 실제 참여 인원수
  const isMinimumMet = currentCount >= minParticipants;   // 모임 개설 최소인원 3명
  
  // 애니메이션 설정
  const springConfig = {
    type: "spring",
    stiffness: 60,
    damping: 15,
    mass: 1
  };

  return (
    <div className="w-full space-y-2">
      {/* 참여 신청한 인원 */}
      <motion.div 
        className="flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-semibold text-body-2-normal text-gray800">
          {`${currentCount}명 참여중`}
        </span>
      </motion.div>
      {/* progress bar */}
      <div className="relative">
            <Progress
              value={targetProgress}
              className="h-3 rounded-full bg-gray200"
              progressColor={isMinimumMet ? "bg-brown400" : "bg-gray500"}   // 최소인원 달성 시 주황색
              springConfig={springConfig}
              // aria-label
              aria-label={`progressDescription`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={targetProgress}
              aria-valuetext={`${currentCount}명 참여 중 (${Math.round(targetProgress)}%)`}
            />
            {/* Fire 아이콘 */}
              <motion.div
                className="absolute top-0.5"
                initial={{ left: 0}}
                animate={{
                  left: `${targetProgress}%`,
                  scale: [1, 1.2, 1],
                }}
                // transition={{
                //   left: springConfig,
                //   scale: {
                //     duration: 2,
                //     repeat: Infinity,
                //     repeatType: "reverse"
                //   }
                // }}
                style={{ translateX: '-50%', translateY: '-50%', }}
                aria-hidden="true"
              >
                <FireIcon />
              </motion.div>
      </div>
      {/* 최소, 최대 인원 */}
      <motion.div className="flex justify-between text-xs">
        <span className="text-caption-normal font-medium text-gray500">
          {`최소인원 ${minParticipants}명`}
        </span>
        <span className="text-caption-normal font-medium text-gray500">
          {`최대인원 ${maxParticipants}명`}
        </span>
      </motion.div>
    </div>
  );
}
