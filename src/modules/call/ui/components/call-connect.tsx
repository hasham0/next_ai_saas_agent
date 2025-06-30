"use client";

import { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";
import {
  Call,
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useMutation } from "@tanstack/react-query";
import CallUI from "@/modules/call/ui/components/call-ui";
import { useTRPC } from "@/trpc/client";

import "@stream-io/video-react-sdk/dist/css/styles.css";

type Props = {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
};

const CallConnect = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: Props) => {
  const trpc = useTRPC();
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions()
  );
  const [client, setClient] = useState<StreamVideoClient>();

  useEffect(() => {
    const currentCallClient = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: generateToken,
    });
    setClient(currentCallClient);

    return () => {
      currentCallClient.disconnectUser();
      setClient(undefined);
    };
  }, [userId, userName, userImage, generateToken]);

  const [call, setCall] = useState<Call>();

  useEffect(() => {
    if (!client) return;
    const currentCall = client.call("default", meetingId);
    currentCall.camera.disable();
    currentCall.microphone.disable();
    setCall(currentCall);

    return () => {
      if (currentCall.state.callingState !== CallingState.LEFT) {
        currentCall.leave();
        currentCall.endCall();
        setCall(undefined);
      }
    };
  }, [client, meetingId]);

  if (!client || !call) {
    return (
      <div className="from-sidebar-accent to-sidebar flex h-screen items-center justify-center bg-radial">
        <LoaderIcon className="size-6 animate-spin text-white" />;
      </div>
    );
  }
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
};

export default CallConnect;
