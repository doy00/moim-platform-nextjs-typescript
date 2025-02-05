import Link from "next/link"
import { DothemeetLogo } from "../detail/icons/Dothemeet"

export const Header = () => {
  return (
    <Link href="/" className="w-full h-14 py-[10px] flex items-center">
      <DothemeetLogo />
    </Link>
  )
};