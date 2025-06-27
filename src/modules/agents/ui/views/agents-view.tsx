"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import EmptyState from "@/components/shared/empty-state";
import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import { columns } from "@/modules/agents/ui/components/columns";
import { DataTable } from "@/modules/agents/ui/components/data-table";
import { useTRPC } from "@/trpc/client";

const AgentsViewLoading = () => (
  <LoadingState
    title="Loading Agents"
    description="This may take a few seconds"
  />
);

const AgentsPageError = () => (
  <ErrorState title="Error Loading" description="Something went wrong" />
);

const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8 md:py-8">
      {/* {JSON.stringify(data, null, 2)} */}

      <DataTable data={data} columns={columns} />
      {data?.length === 0 && (
        <EmptyState
          title="Create Your First Agent"
          description="Create an agent to get started. Each agent will follow your instructions and interact with participants in real-time."
        />
      )}
    </div>
  );
};

export { AgentsView, AgentsViewLoading, AgentsPageError };
