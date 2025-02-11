import { IUserEdit, IMeJsonData } from '@/types/mypage/user';

export const useUserFormData = () => {
  const createFormData = (editUser: IUserEdit): FormData => {
    const formData = new FormData();

    const jsonData: IMeJsonData = {
      email: editUser.email,
      // password: editUser.password || '',
      nickname: editUser.nickname,
      position: editUser.position,
      introduction: editUser.introduction || '',
      tags: editUser.tags || [],
    };

    formData.append('me_json', JSON.stringify(jsonData));

    if (editUser.image instanceof File) {
      formData.append('me_image', editUser.image);
    }

    return formData;
  };

  return { createFormData };
};
