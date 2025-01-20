// 현재 링크를 클립보드에 복사하는 커스텀 훅
import { useState, useCallback } from "react";
import { toast } from 'sonner';

interface IUseClipboard {
  successMessage?: string;
  errorMessage?: string;
}

export const useClipboard = (options: IUseClipboard) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async (text: string) => {   // 리렌더링시 함수 재생성 방지
    const {
      successMessage = "클립보드에 복사되었습니다.",          // 기본 메시지
      errorMessage = "복사를 실패했습니다. 다시 시도해주세요."
    } = options;

    try {
      if (navigator.clipboard) {
        // 크롬 66버전 이상일 때 정상적으로 복사 가능
        await navigator.clipboard.writeText(text);    
        setCopied(true);
        toast.success(successMessage);
        // 2초 후 복사 상태 초기화
        setTimeout(() => setCopied(false), 2000);

      } else {
        // 예전 브라우저 지원
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '0';
        textarea.style.top = '0';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
          document.execCommand('copy');
          setCopied(true);
          toast.success(successMessage);
        } catch (error) {
          console.error('복사 실패', error);
          toast.error(errorMessage);
        } finally {
          document.body.removeChild(textarea);
        }
      }
    } catch (error) {
      console.error('클립보드에 복사 실패:', error);
      toast.error(errorMessage);
    }
  }, [options]);

  return { copyToClipboard, copied}
};