"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import ErrorState from "@/components/shared/error-state";
import CallProvider from "@/modules/call/ui/components/call-provider";
import { MeetingStatus } from "@/modules/meetings/types";
import { useTRPC } from "@/trpc/client";

type Props = {
  callId: string;
};

const CallView = ({ callId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: callId,
    })
  );

  if (data.status === MeetingStatus.Completed) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ErrorState
          title="Meeting has ended"
          description="You can no longer join this meeting"
        />
      </div>
    );
  }

  return <CallProvider meetingId={callId} meetingName={data.name} />;
};

export default CallView;
