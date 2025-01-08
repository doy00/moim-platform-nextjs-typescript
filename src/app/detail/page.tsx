/** app/detail/[teamId]/[id]/page.tsx */
import DetailContainer from "@/containers/detail/DetailContainer";

export default async function GatheringsDetail() {

  return (
    <div className="w-full h-screen px-4 py-4 bg-white">
          <DetailContainer />
    </div>
  );
}
