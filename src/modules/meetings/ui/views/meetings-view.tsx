"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import { useTRPC } from "@/trpc/client";

type Props = {};
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
const MeetingsView = ({}: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return <div>{JSON.stringify(data)}</div>;
};

export { MeetingsView, MeetingsViewLoading, MeetingsViewError };
