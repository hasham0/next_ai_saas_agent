"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import EmptyState from "@/components/shared/empty-state";
import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import useAgentFilters from "@/modules/agents/hooks/use-agents-filters";
import { columns } from "@/modules/agents/ui/components/columns";
import DataPagination from "@/modules/agents/ui/components/data-pagination";
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
  const [filters, setFilters] = useAgentFilters();
  const trpc = useTRPC();
  const {
    data: { items, totalPages },
  } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );
  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8 md:py-6">
      <DataTable data={items} columns={columns} />
      <DataPagination
        page={filters.page}
        totalPages={totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {items?.length === 0 && (
        <EmptyState
          title="Create Your First Agent"
          description="Create an agent to get started. Each agent will follow your instructions and interact with participants in real-time."
        />
      )}
    </div>
  );
};

export { AgentsView, AgentsViewLoading, AgentsPageError };
