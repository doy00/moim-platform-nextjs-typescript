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
            "group-[.toaster]:bg-gray900/90",  // 어두운 배경색
            "group-[.toaster]:bg-opacity88",  // 배경 opacity
            "group-[.toaster]:text-gray100", // 밝은 텍스트 색상
            "group-[.toaster]:border-gray900", // 테두리 색상
            "group-[.toaster]:shadow-lg",
            "group-[.toaster]:rounded-xl",   // 둥근 모서리
            "group-[.toaster]:px-4",         // 좌우 패딩
            "group-[.toaster]:py-3",         // 상하 패딩
          ].join(" "),
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { ToasterDark }
