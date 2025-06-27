"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VideoIcon } from "lucide-react";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import ErrorState from "@/components/shared/error-state";
import { GeneratedAvatar } from "@/components/shared/generated-avatar";
import LoadingState from "@/components/shared/loading-state";
import { Badge } from "@/components/ui/badge";
import useConfirm from "@/hooks/use-confirm";
import AgentIdViewHeader from "@/modules/agents/ui/components/agent-id-view-header";
import UpdateAgentDialog from "@/modules/agents/ui/components/update-agent-dialog";
import { useTRPC } from "@/trpc/client";

type Props = {
  agentId: string;
};
const AgentIdViewLoading = () => (
  <LoadingState
    title="Loading Agent"
    description="This may take a few seconds"
  />
);

const AgentIdViewError = () => (
  <ErrorState title="Error Loading Agent" description="Something went wrong" />
);
const AgentIdView = ({ agentId }: Props) => {
  const router = useRouter();
  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm({
    title: "Are you sure?",
    description: `The following action will remove ${data.meetingCount} associated meetings`,
  });

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
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
            <Badge
              variant="outline"
              className="flex items-center gap-x-2 [&>svg]:size-4"
            >
              <VideoIcon className="text-blue-700" />
              {data.meetingCount}&nbsp;
              {data.meetingCount === 1 ? "meeting" : "meetings"}
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium">Instructions</p>
              <p className="text-neutral-800">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { AgentIdView, AgentIdViewLoading, AgentIdViewError };
