import Image from 'next/image';
import logo from '../../../../public/images/mypage/logo.svg';
import edit from '../../../../public/images/mypage/edit.svg';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="flex justify-between items-center px-5 py-4 gap-2.5">
      <Link href="/">
        <Image src={logo} alt="logo" width={120} height={16} />
      </Link>
      <Link href="/mypage/editUser">
        <Image src={edit} alt="edit" width={24} height={24} />
      </Link>
    </div>
  );
}
