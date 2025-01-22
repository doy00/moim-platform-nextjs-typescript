import { setupWorker } from 'msw';
import { handlers } from './handlers';

// 브라우저에서 MSW를 초기화
export const worker = setupWorker(...handlers);
