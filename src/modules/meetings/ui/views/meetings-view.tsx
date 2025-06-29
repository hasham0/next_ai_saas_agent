"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/shared/data-table";
import EmptyState from "@/components/shared/empty-state";
import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import { columns } from "@/modules/meetings/ui/components/columns";
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
  const {
    data: { items },
  } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable data={items} columns={columns} />
      {items?.length === 0 && (
        <EmptyState
          title="Create Your First Meeting"
          description="Create a meeting to get started. Each meeting will follow your instructions and interact with participants in real-time."
        />
      )}
    </div>
  );
};

export { MeetingsView, MeetingsViewLoading, MeetingsViewError };
