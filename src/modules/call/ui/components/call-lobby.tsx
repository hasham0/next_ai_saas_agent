"use client";

import Link from "next/link";
import { LogInIcon } from "lucide-react";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  VideoPreview,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { generateAvatarUri } from "@/components/shared/avatar-uri";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import "@stream-io/video-react-sdk/dist/css/styles.css";

type Props = {
  onJoinCall: () => void;
};

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();
  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? "",
          image:
            data?.user.image ??
            generateAvatarUri({
              seed: data?.user.name ?? "",
              variant: "initials",
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowserPermissions = () => {
  return (
    <p className="text-sm">Please allow access to your camera and microphone</p>
  );
};

const CallLobby = ({ onJoinCall }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();
  const { hasBrowserPermission: hasMicrophonePermission } =
    useMicrophoneState();

  const hasBrowserMediaPermissions =
    hasCameraPermission && hasMicrophonePermission;

  return (
    <div className="from-sidebar-accent to-sidebar flex h-full flex-col items-center justify-center bg-radial">
      <div className="flex flex-1 items-center justify-center px-8 py-4">
        <div className="bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Ready to join?</h6>
            <p className="text-sm">
              Set up your camera and microphone and join the call
            </p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasBrowserMediaPermissions
                ? DisabledVideoPreview
                : AllowBrowserPermissions
            }
          />
          <div className="flex gap-x-2">
            <ToggleVideoPreviewButton />
            <ToggleAudioPreviewButton />
          </div>
          <div className="flex w-full justify-between gap-x-2">
            <Button asChild variant={"ghost"}>
              <Link href="/meetings">Cancel</Link>
            </Button>
            <Button onClick={onJoinCall}>
              <LogInIcon />
              Join Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallLobby;
