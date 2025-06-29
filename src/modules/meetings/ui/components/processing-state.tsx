import EmptyState from "@/components/shared/empty-state";

const ProcessingState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
      <EmptyState
        title="Meeting Completed"
        description="This meeting has been completed, a summary will appear here."
        image="/assets/processing.svg"
      />
    </div>
  );
};

export default ProcessingState;
