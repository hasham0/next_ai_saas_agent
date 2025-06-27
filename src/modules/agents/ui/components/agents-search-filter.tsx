import { ChangeEvent } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import useAgentFilters from "@/modules/agents/hooks/use-agents-filters";

const AgentsSearchFilter = () => {
  const [filters, setFilters] = useAgentFilters();

  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        value={filters.search}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setFilters({ search: event.target.value })
        }
        className="h-9 w-[200px] bg-white pl-7"
      />
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />
    </div>
  );
};

export default AgentsSearchFilter;
