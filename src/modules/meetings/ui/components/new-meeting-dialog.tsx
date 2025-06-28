import { useRouter } from "next/navigation";
import ResponsiveDialog from "@/components/shared/responsive-dialog";
import MeetingForm from "@/modules/meetings/ui/components/meeting-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const NewMeetingDialog = ({ open, onOpenChange }: Props) => {
  const router = useRouter();

  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create a new meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);

          router.push(`/meetings/${id}`);
        }}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};

export default NewMeetingDialog;
