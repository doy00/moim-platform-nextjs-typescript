'use client';

import { LoadingAnimation } from '@/components/mypage/LoadingAnimation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EditPassword() {
  return (
    <div>
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <LoadingAnimation />
        <p className="text-heading-2 text-gray500">비밀번호 변경 페이지 개발중입니다</p>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Link href="/mypage/editUser" className="rounded-xl bg-gray950 px-5 py-2">
            <span className="font-semibold text-label-normal text-gray50">뒤로가기</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
