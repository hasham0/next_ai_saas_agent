import Link from "next/link";
import { VideoIcon } from "lucide-react";
import EmptyState from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

type Props = {
  meetingId: string;
};

const ActiveState = ({ meetingId }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
      <EmptyState
        title="Meeting is Active"
        description="Meeting will end once all participants leave the meeting."
        image="/assets/upcoming.svg"
      />
      <div className="flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center">
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ActiveState;
