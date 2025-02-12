import { z } from 'zod';

const tagSchema = z.object({
  value: z.string().max(5, '최대 5글자까지 입력 가능해요'),
});

export const signInSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식을 입력해 주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요').min(8, '비밀번호를 확인해주세요'),
});

export const signUpSchema = z
  .object({
    ...signInSchema.shape,
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요')
      .min(8, '비밀번호는 8자 이상이어야 해요')
      .regex(
        /^(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        '특수문자 포함 8~20자 사이로 입력해주세요',
      ),
    passwordConfirm: z.string().min(1, '비밀번호를 다시한번 입력해주세요'),
    nickname: z.string().min(1, '닉네임을 입력해주세요'),
    position: z.enum(['PM', 'DESIGNER', 'FRONTEND', 'BACKEND'], {
      required_error: '직군을 선택해주세요',
    }),
    introduction: z.string().max(20, '최대 20자까지 입력 가능해요').optional(),
    tags: z.array(tagSchema).max(3, '최대 3개까지 입력 가능해요').optional(),
  })
  .partial() // 반드시 partial 처리해야 함
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        path: ['passwordConfirm'],
        code: 'custom',
        message: '비밀번호가 일치하지 않아요',
      });
    }
  });

export type TSignInSchema = z.infer<typeof signInSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;
