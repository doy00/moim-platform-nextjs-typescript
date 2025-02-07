"use client";

import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

export const makeSuccessToast = (moimId: string, onNavigate?: () => void) => {
  toast.success("모임이 성공적으로 생성되었습니다!", {
    description: "새로운 모임이 생성되었어요.",
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    duration: 4000,
    position: "top-right",
    action: onNavigate
      ? {
          label: "모임 보러가기",
          onClick: onNavigate, // 콜백 함수 이동처리
        }
      : undefined,
  });
};

export const makeErrorToast = (message = "모임 생성 중 오류가 발생했습니다.") => {
  toast.error("오류 발생!", {
    description: message,
    icon: <XCircle className="w-5 h-5 text-red-500" />,
    duration: 4000,
    position: "top-right",
  });
};
