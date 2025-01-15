import { IStatusItem } from "@/types/home/i-filterStatus";
import ConeIcon from "@/components/home/icons/ConeIcon";
import AnnouncementIcon from "@/components/home/icons/AnnouncementIcon";
import FireIcon from "@/components/home/icons/FireIcon";
import HandIcon from "@/components/home/icons/HandIcon";

export const STATUS_ITEMS: IStatusItem[] = [
  { id: 'all', label: '모든 모임 보기', icon: ConeIcon },
  { id: 'recruiting', label: '모집 중이에요', icon: AnnouncementIcon },
  { id: 'ongoing', label: '진행 중이에요', icon: FireIcon },
  { id: 'finished', label: '종료된 모임이에요', icon: HandIcon },
]