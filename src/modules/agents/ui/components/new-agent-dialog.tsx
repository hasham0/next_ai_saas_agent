import ResponsiveDialog from "@/components/shared/responsive-dialog";
import AgentForm from "@/modules/agents/ui/components/agent-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const NewAgentDialog = ({ open, onOpenChange }: Props) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSucces={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};

export default NewAgentDialog;
