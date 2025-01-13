/** app/detail/[teamId]/[id]/page.tsx */
import DetailContainer from "@/containers/detail/DetailContainer";
import { Suspense } from "react";

export default async function DetailPage() {

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
          <DetailContainer />
      </Suspense>
    </div>
  );
}
