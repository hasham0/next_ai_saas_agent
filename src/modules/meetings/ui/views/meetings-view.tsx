"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import { useTRPC } from "@/trpc/client";

const MeetingsViewLoading = () => (
  <LoadingState
    title="Loading Meetings"
    description="This may take a few seconds"
  />
);

const MeetingsViewError = () => (
  <ErrorState
    title="Error Loading Meetings"
    description="Something went wrong"
  />
);
const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className="w-md overflow-hidden border-2 border-black">
      <div className="max-w-md">{JSON.stringify(data)}</div>
    </div>
  );
};

export { MeetingsView, MeetingsViewLoading, MeetingsViewError };
