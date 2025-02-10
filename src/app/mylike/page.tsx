// import { Suspense } from "react"
import MyLikeContainer from "@/containers/mylike/MyLikeContainer"
// import { MyLikeSkeleton } from "@/components/mylike/MyLikeSkeleton"

export default function MyLikePage () {
  return (
    <div>
      {/* <Suspense fallback={<MyLikeSkeleton />}> */}
        <MyLikeContainer />
      {/* </Suspense> */}
    </div>
  )
}