"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const ToasterDark = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:[
            "group",
            "toast",
            "group-[.toaster]:h-[62px]",
            "group-[.toaster]:bg-gray900",  // 어두운 배경색
            "group-[.toaster]:backdrop-blur-[6px]",
            // "group-[.toaster]:bg-opacity88",  // 배경 opacity
            "group-[.toaster]:text-gray100", // 밝은 텍스트 색상
            "group-[.toaster]:border-gray900", // 테두리 색상
            "group-[.toaster]:shadow-[4px_4px_8px_rgba(130,130,130,0.10),-4px_-4px_8px_rgba(130,130,130,0.10)]",
            "group-[.toaster]:rounded-[20px]",   // 둥근 모서리
            "group-[.toaster]:px-5",         // 좌우 패딩
            "group-[.toaster]:py-4",         // 상하 패딩
          ].join(" "),
          description: "group-[.toast]:text-muted-foreground",
          actionButton: [
            "group-[.toast]:bg-gray950",
            "group-[.toast]:text-gray50",
            "group-[.toast]:px-[14px]",
            "group-[.toast]:py-2",
            "group-[.toast]:text-label-normal",
            "group-[.toast]:rounded-[20px]",
            "group-[.toast]:font-semibold",
            "group-[.toast]:hover:bg-gray800",
            "group-[.toast]:transition-colors",
          ].join(" "),
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { ToasterDark }
