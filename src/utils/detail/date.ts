// 날짜 데이터 관련 유틸 함수

/** 
 * 1. 날짜 데이터 형식 변환 함수
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
 * 2. 현재 시점 기준으로 상대적 날짜,시간 데이터 표시 (예: '2시간 전', '3일 전')
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
    // if (diffInSeconds < 604800) return `D-${Math.floor(diffInSeconds / 86400)}`;

    return formatDate(dateString);
  } catch (error) {
    console.error('Relative time calculation error:', error);
    return '날짜 형식 오류';
  }
};

/**
 * 3. 두 날짜를 받아서 '시작일 - 종료일' 형식의 기간 문자열을 반환합니다.
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

/**
 * 4. 마감일까지 남은 일수를 계산하는 함수
 * @param deadlineDate - 마감일 ISO 문자열
 * @returns 남은 일수 문자열 (예: '마감 D-5', '모집종료')
 */
export const getDeadlineText = (deadlineDate: string): string => {
  try {
    const deadline = new Date(deadlineDate);
    const now = new Date();

    // 날짜 비교를 위해 시간을 00:00:00으로 설정
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDate = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate());

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return '모집종료';
    if (diffDays === 0) return '오늘 마감';
    return `마감 D-${diffDays}`;
  } catch (error) {
    console.error('모집 날짜 오류:', error);
    return '';
  }
};