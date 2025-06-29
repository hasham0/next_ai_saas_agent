"use client";

import { useState } from "react";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useMeetingsFilter from "@/modules/meetings/hooks/use-meetings-filters";
import AgentIdFilter from "@/modules/meetings/ui/components/agent-id-filter";
import MeetingsSearchFilter from "@/modules/meetings/ui/components/meetings-search-filter";
import NewMeetingDialog from "@/modules/meetings/ui/components/new-meeting-dialog";
import StatusFilter from "@/modules/meetings/ui/components/status-filters";
import { DEFAULT_PAGE } from "@/utils/constant";

const MeetingsListHeader = () => {
  const [filters, setFilters] = useMeetingsFilter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified =
    !!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilers = () => {
    setFilters({
      search: "",
      agentId: "",
      status: null,
      page: DEFAULT_PAGE,
    });
  };
  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button variant="outline" onClick={onClearFilers}>
                <XCircleIcon className="size-4" />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </>
  );
};

export default MeetingsListHeader;
