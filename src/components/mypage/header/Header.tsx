import Image from 'next/image';
import logo from '../../../../public/images/mypage/logo.svg';
import edit from '../../../../public/images/mypage/edit.svg';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleEditUser = () => {
    router.push('/mypage/editUser');
  };

  return (
    <div className="flex justify-between items-center px-5 py-4 gap-2.5">
      <Image src={logo} alt="logo" width={120} height={16} onClick={handleLogoClick} />
      <Image
        src={edit}
        alt="edit"
        width={24}
        height={24}
        onClick={handleEditUser}
        className="cursor-pointer"
      />
    </div>
  );
}
