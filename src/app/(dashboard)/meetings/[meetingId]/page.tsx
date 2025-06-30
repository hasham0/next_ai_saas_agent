import { Suspense } from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import {
  MeetingIdError,
  MeetingIdLoading,
  MeetingIdView,
} from "@/modules/meetings/ui/views/meetings-id-view";
import { getQueryClient, trpc } from "@/trpc/server";

type Props = { params: Promise<{ meetingId: string }> };

export default async function MeetingIDPage({ params }: Props) {
  const { meetingId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingIdLoading />}>
        <ErrorBoundary fallback={<MeetingIdError />}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
