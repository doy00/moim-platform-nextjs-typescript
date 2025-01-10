import Image from 'next/image';
import logo from '../../../../public/images/mypage/logo.svg';
import edit from '../../../../public/images/mypage/edit.svg';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <div className="flex justify-between items-center px-5 py-4 gap-2.5">
      <Image src={logo} alt="logo" width={120} height={16} onClick={handleLogoClick} />
      <Link href="/mypage/editUser">
        <Image src={edit} alt="edit" width={24} height={24} />
      </Link>
    </div>
  );
}
