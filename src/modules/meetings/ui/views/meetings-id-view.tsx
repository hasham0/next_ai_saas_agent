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
import { GeneratedAvatar } from "@/components/shared/generated-avatar";
import LoadingState from "@/components/shared/loading-state";
import useConfirm from "@/hooks/use-confirm";
import MeetingIdViewHeader from "@/modules/meetings/ui/components/meeting-id-view-header";
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
        <div className="rounded-lg border bg-white">
          <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar
                variant="botttsNeutral"
                seed={data.name}
                className="size-10"
              />
              <h2 className="text-2xl font-medium">{data.name}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { MeetingIdView, MeetingIdLoading, MeetingIdError };
