"use client";

import { LoaderIcon } from "lucide-react";
import { generateAvatarUri } from "@/components/shared/avatar-uri";
import { authClient } from "@/lib/auth-client";
import CallConnect from "@/modules/call/ui/components/call-connect";

type Props = {
  meetingId: string;
  meetingName: string;
};

const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div className="from-sidebar-accent to-sidebar flex h-screen items-center justify-center bg-radial">
        <LoaderIcon className="size-6 animate-spin text-white" />;
      </div>
    );
  }
  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={
        data.user.image ??
        generateAvatarUri({
          seed: data.user.name,
          variant: "initials",
        })
      }
    />
  );
};

export default CallProvider;
