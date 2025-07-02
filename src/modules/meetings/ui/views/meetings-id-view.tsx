"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import useConfirm from "@/hooks/use-confirm";
import { MeetingStatus } from "@/modules/meetings/types";
import ActiveState from "@/modules/meetings/ui/components/active-state";
import CancelledState from "@/modules/meetings/ui/components/cancelled-state";
import CompletedState from "@/modules/meetings/ui/components/completed-state";
import MeetingIdViewHeader from "@/modules/meetings/ui/components/meeting-id-view-header";
import ProcessingState from "@/modules/meetings/ui/components/processing-state";
import UpcomingState from "@/modules/meetings/ui/components/upcoming-state";
import UpdateMeetingDialog from "@/modules/meetings/ui/components/update-meeting-dialog";
import { useTRPC } from "@/trpc/client";

type Props = {
  meetingId: string;
};
const MeetingIdLoading = () => (
  <LoadingState
    title="Loading Meeting"
    description="This may take a few seconds"
  />
);

const MeetingIdError = () => (
  <ErrorState
    title="Error Loading Meeting"
    description="Something went wrong"
  />
);

const MeetingIdView = ({ meetingId }: Props) => {
  const router = useRouter();
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const isActive = data.status === MeetingStatus.Active;
  const isUpcoming = data.status === MeetingStatus.Upcoming;
  const isCancelled = data.status === MeetingStatus.Cancelled;
  const isCompleted = data.status === MeetingStatus.Completed;
  const isProcessing = data.status === MeetingStatus.Processing;

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm({
    title: "Are you sure?",
    description: `The following action will remove this meetings`,
  });

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeMeeting.mutateAsync({ id: meetingId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            isCalling={false}
            onCancelMeeting={() => {}}
          />
        )}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <CompletedState data={data} />}
      </div>
    </>
  );
};

export { MeetingIdView, MeetingIdLoading, MeetingIdError };
