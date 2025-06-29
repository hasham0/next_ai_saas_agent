import EmptyState from "@/components/shared/empty-state";

const CancelledState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
      <EmptyState
        title="Meeting Cancelled"
        description="This meeting has been cancelled."
        image="/assets/cancelled.svg"
      />
    </div>
  );
};

export default CancelledState;
