//Components-Icon
import ConeIcon from "@/components/home/icons/ConeIcon";
import PuzzleIcon from "@/components/home/icons/PuzzleIcon";
import OpenBookIcon from "@/components/home/icons/OpenBookIcon";
import ConversationIcon from "@/components/home/icons/ConversationIcon";
import AnnouncementIcon from "@/components/home/icons/AnnouncementIcon";
import FireIcon from "@/components/home/icons/FireIcon";
import HandIcon from "@/components/home/icons/HandIcon";
//Types
import { ICategoryItem } from "@/types/home/i-filterCategory";
import { IStatusItem } from "@/types/home/i-filterStatus";
import { IFilterTabMenu } from "@/types/home/i-filtertab";
import { IOnOffItem } from "@/types/home/i-fillterOnOff";

export const CATEGORY_ITEMS: ICategoryItem[] = [
  { id: 'all', label: '모든 모임 보기', icon: ConeIcon },
  { id: 'PROJECT', label: '프로젝트', icon: PuzzleIcon },
  { id: 'STUDY', label: '스터디', icon: OpenBookIcon },
  { id: 'INTERVIEW', label: '면접', icon: ConversationIcon },
]

export const CATEGORY_ITMES_TWO: ICategoryItem[] = [
  { id: 'PROJECT', label: '프로젝트', icon: PuzzleIcon },
  { id: 'STUDY', label: '스터디', icon: OpenBookIcon },
  { id: 'INTERVIEW', label: '면접', icon: ConversationIcon },
]
export const STATUS_ITEMS: IStatusItem[] = [
  { id: 'all', label: '모든 모임 보기', icon: ConeIcon },
  { id: 'RECRUIT', label: '모집 중이에요', icon: AnnouncementIcon },
  { id: 'PROGRESS', label: '진행 중이에요', icon: FireIcon },
  { id: 'END', label: '종료된 모임이에요', icon: HandIcon },
]

export const ONOFF_ITEMS: IOnOffItem[] = [
  { id: 'all', label: '전체' },
  { id: 'online', label: '온라인' },
  { id: 'offline', label: '오프라인' },
];
export const FILTER_TAB_MENUS: IFilterTabMenu[] = [
  {
    id: 'category',
    label: '카테고리',
  },
  {
    id: 'region',
    label: '온/오프',
  },
  {
    id: 'status',
    label: '상태',
  },
]