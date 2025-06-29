import Link from "next/link";
import { BanIcon, VideoIcon } from "lucide-react";
import EmptyState from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

type Props = {
  meetingId: string;
  isCalling: boolean;
  onCancelMeeting: () => void;
};

const UpcomingState = ({ meetingId, isCalling, onCancelMeeting }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
      <EmptyState
        title="Not Started yet"
        description="Once you start a meeting, your summary will appear here."
        image="/assets/upcoming.svg"
      />
      <div className="flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center">
        <Button
          variant={"secondary"}
          disabled={isCalling}
          onClick={onCancelMeeting}
          className="w-full lg:w-auto"
        >
          <BanIcon />
          Cancel meeting
        </Button>
        <Button asChild disabled={isCalling} className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UpcomingState;
