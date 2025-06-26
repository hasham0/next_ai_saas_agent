"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import { useTRPC } from "@/trpc/client";

const AgentsViewLoading = () => (
  <LoadingState
    title="Loading Agents"
    description="Thismay take a few seconds"
  />
);

const AgentsPageError = () => (
  <ErrorState title="Error Loading" description="Something went wrong" />
);
const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export { AgentsView, AgentsViewLoading, AgentsPageError };
