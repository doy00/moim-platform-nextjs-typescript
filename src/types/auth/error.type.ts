export type TError = {
  data:
    | '비밀번호가 일치하지 않습니다.'
    | '유저가 존재하지 않습니다.'
    | '서버 관리자에게 문의바랍니다.';
  isSuccess: boolean;
  message: string;
  status: number;
};
