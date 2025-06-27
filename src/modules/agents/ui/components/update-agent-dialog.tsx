import ResponsiveDialog from "@/components/shared/responsive-dialog";
import { AgentGetOne } from "@/modules/agents/types";
import AgentForm from "@/modules/agents/ui/components/agent-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: AgentGetOne;
};

const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: Props) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the agent details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};

export default UpdateAgentDialog;
