// 'use client';

// import Image from 'next/image';
// import { getUserInfo, editUserInfo } from '@/apis/userInfo';
// import defaultProfile from '../../../public/images/dude.png';
// import { IUser } from '@/types/user';
// import { useEffect, useState } from 'react';

// export default function ProfileEditContainer() {
//   const [userInfo, setUserInfo] = useState<IUser>();
//   const [editUser, setEditUser] = useState<IUser>();

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       const data = await getUserInfo();
//       setUserInfo(data);
//     };
//     fetchUserInfo();
//   }, []);

//   const handleEditUser = async () => {
//     if (!editUser) return;
//     const data = await editUserInfo(userInfo?.id || 0, editUser);
//     setEditUser(data);
//   };

//   return (
//     <>
//       <div className="flex flex-col items-center gap-4">
//         <div className="flex flex-col items-center gap-6">
//           <Image src={userInfo?.image ?? defaultProfile} alt="profile" width={100} height={100} />
//           {/* TODO: 폰트 색상 안먹힘 해결하기 */}
//           <span className="text-label-normal font-medium text-orange200">비밀번호 변경</span>
//         </div>

//         <div className="flex flex-col gap-2">
//           <label htmlFor="email">이메일 주소</label>
//           <input
//             type="text"
//             id="email"
//             placeholder="dothemeet@google.com"
//             className="rounded-xl bg-background400 px-4 py-[18px]"
//           />
//         </div>
//         <button onClick={handleEditUser}>수정</button>
//       </div>
//     </>
//   );
// }
