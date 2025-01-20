// 날짜 데이터 관련 유틸 함수

/** 
 * 날짜 데이터 형식 변환 함수
 * @param dateString - ISO 형식의 날짜 문자열 (예: '2025-01-31T09:00:00.000Z')
 * @param options - 포맷팅 옵션
 * @returns 포맷팅된 날짜 문자열 (예: '25. 01. 31.') 
 */ 
export const formatDate = (
  dateString: string,
  options: {
    delimiter?: string;  // 구분자 커스텀 (기본값은 '.')
    withTime?: boolean;  // 시간 포함 여부 (기본값은 false)
  } = {}
): string => {
  const { delimiter = '. ', withTime = false } = options;

  try {
    const date = new Date(dateString);

    // 에러 처리
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    // 한국 시간대로 변환
    const koreanDate = new Date(date.getTime()  + (9 * 60 * 60 * 1000));
    const formattedDate = koreanDate.toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }).split('.').map(part => part.trim()).join(delimiter);

    if (!withTime) {
      return formattedDate;
    }

    // 시간 포함 시 시:분 형식 추가
    const hours = String(koreanDate.getHours()).padStart(2, '0');
    const minutes = String(koreanDate.getMinutes()).padStart(2, '0');
    return `${formattedDate}${delimiter}${hours}:${minutes}`;
  } catch (error) {
    console.error('Date formatting error:', error);
    return '날짜 형식 오류';
  
  }
};



/**
 * 현재 시점 기준으로 상대적 날짜,시간 데이터 표시 (예: '2시간 전', '3일 전')
 * @param dateString - ISO 형식의 날짜 문자열 (예: '2025-01-31T09:00:00.000Z')
 * @returns 상대적 시간 문자열
 */

export const getRelativeTimeString = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return '방금 전';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`;
    
    return formatDate(dateString);
  } catch (error) {
    console.error('Relative time calculation error:', error);
    return '날짜 형식 오류';
  }
};

/**
 * 두 날짜를 받아서 '시작일 - 종료일' 형식의 기간 문자열을 반환합니다.
 * @param startDate - 시작일 ISO 문자열
 * @param endDate - 종료일 ISO 문자열
 * @returns 포맷팅된 기간 문자열 (예: '25. 01. 20. - 25. 01. 31.')
 */
export const formatDateRange = (startDate: string, endDate: string): string => {
  if (!startDate || !endDate) return '';
  
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  
  if (!formattedStartDate || !formattedEndDate) return '';
  
  return `${formattedStartDate} - ${formattedEndDate}`;
};