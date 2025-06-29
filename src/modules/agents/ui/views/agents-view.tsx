"use client";

import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import DataPagination from "@/components/shared/data-pagination";
import { DataTable } from "@/components/shared/data-table";
import EmptyState from "@/components/shared/empty-state";
import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import useAgentFilters from "@/modules/agents/hooks/use-agents-filters";
import { columns } from "@/modules/agents/ui/components/columns";
import { useTRPC } from "@/trpc/client";

const AgentsViewLoading = () => (
  <LoadingState
    title="Loading Agents"
    description="This may take a few seconds"
  />
);

const AgentsViewError = () => (
  <ErrorState title="Error Loading Agents" description="Something went wrong" />
);

const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentFilters();
  const trpc = useTRPC();
  const {
    data: { items, totalPages },
  } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );
  console.log("🚀 ~ AgentsView ~ data:", items);
  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8 md:py-6">
      <DataTable
        data={items}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
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

export { AgentsView, AgentsViewLoading, AgentsViewError };
