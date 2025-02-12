import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { MdLogout } from "react-icons/md";

export const makeSuccessToast = (moimId: string, onNavigate?: () => void) => {
  toast.success("모임이 성공적으로 생성되었습니다!", {
    description: "새로운 모임이 생성되었어요.",
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    duration: 4000,
    position: "top-right",
    action: onNavigate
      ? {
          label: "모임 보러가기",
          onClick: () => {
            setTimeout(() => {
              onNavigate();
            }, 0);
          },
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

export const confirmSignout = (onSignout: () => void) => {
  toast("로그아웃하시겠습니까?", {
    description: "로그아웃 후에는 다시 로그인해야 합니다.",
    icon: <MdLogout className="w-5 h-5 text-red-500" />,
    duration: 5000,
    position: "top-center",
    action: {
      label: "로그아웃",
      onClick: () => {
        setTimeout(() => {
          onSignout();
        }, 0);
      },
    },
  });
};
