import { Suspense } from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import CallView from "@/modules/call/ui/views/call-view";
import { getQueryClient, trpc } from "@/trpc/server";

type Props = {
  params: Promise<{ call_Id: string }>;
};

export default async function CallPage({ params }: Props) {
  const { call_Id } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: call_Id })
  );
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CallView callId={call_Id} />
        {/* <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
          </ErrorBoundary>
        </Suspense> */}
      </HydrationBoundary>
    </>
  );
}
