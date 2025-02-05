import { ICategoryItem } from "@/types/home/i-filterCategory";
import ConeIcon from "@/components/home/icons/ConeIcon";
import PuzzleIcon from "@/components/home/icons/PuzzleIcon";
import OpenBookIcon from "@/components/home/icons/OpenBookIcon";
import ConversationIcon from "@/components/home/icons/ConversationIcon";

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