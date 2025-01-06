import { IMenuItem } from "@/types/home/i-menuItem"
// Components-Icon
import ConeIcon from "@/components/home/icons/ConeIcon"
import HeartIcon from "@/components/home/icons/HeartIcon"
import FootIcon from "@/components/home/icons/FootIcon"

export const GNB_MENU: IMenuItem[] = [
  { name: '모임찾기', path: '/home', icon: ConeIcon },
  { name: '찜한모임', path: '/participants', icon: HeartIcon },
  { name: '마이페이지', path: '/mypage', icon: FootIcon },
]