'use client';

import Image from 'next/image';
import { getUserInfo, editUserInfo } from '@/apis/userInfo';
import defaultProfile from '../../../../public/images/dude.png';
import { IUser } from '@/types/user';
import { useEffect, useState } from 'react';

export default function EditUser() {
  const [userInfo, setUserInfo] = useState<IUser>();
  const [editUser, setEditUser] = useState<IUser>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      setUserInfo(data);
    };
    fetchUserInfo();
  }, []);

  const handleEditUser = async () => {
    if (!editUser) return;
    const data = await editUserInfo(userInfo?.id || 0, editUser);
    setEditUser(data);
  };

  return (
    <div>
      <h1>프로필 수정하기</h1>
      <form>
        <Image src={userInfo?.image ?? defaultProfile} alt="profile" width={100} height={100} />
        <input type="text" placeholder="회사" />
      </form>
    </div>
  );
}
