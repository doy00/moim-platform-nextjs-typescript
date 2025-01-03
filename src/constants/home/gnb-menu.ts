import { IMenuItem } from "@/types/home/i-menuItem"
// Components-Icon
import ConeIcon from "@/components/home/icons/ConeIcon"
import HeartIcon from "@/components/home/icons/HeartIcon"
import PlanetIcon from "@/components/home/icons/PlanetIcon"
import FootIcon from "@/components/home/icons/FootIcon"

export const GNB_MENU: IMenuItem[] = [
  { name: '모임찾기', path: '/home', icon: ConeIcon },
  { name: '찜한모임', path: '/participants', icon: HeartIcon },
  { name: '모든리뷰', path: '/reviews',icon: PlanetIcon },
  { name: '마이페이지', path: '/mypage', icon: FootIcon },
]