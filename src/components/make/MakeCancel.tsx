'use client'

import React from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteIcon from "../home/icons/DeleteIcon";

interface MakeCancelProps {
  onLeave: () => void; 
}

export default function MakeCancel({ onLeave }: MakeCancelProps) {
  const router = useRouter()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-gray-600 hover:text-black">
          <DeleteIcon className="fill-black"/>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[283px] h-[180px] p-6 rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-body-1-normal">취소하고 나갈까요?</AlertDialogTitle>
          <AlertDialogDescription className="text-body-2-normal text-gray400">
            나가면 내용이 저장되지 않아요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex items-center justify-center space-x-2">
            <AlertDialogCancel
              className="w-[114px] h-12 m-0 rounded-[14px] text-gray500 bg-gray200"
              onClick={() => router.push("/")} 
            >
              나가기
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-[114px] h-12 m-0 rounded-[14px]"
              onClick={onLeave}
              >
              이어서 작성하기
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
