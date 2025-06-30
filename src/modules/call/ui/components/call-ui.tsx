"use client";

import { useState } from "react";
import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import CallActive from "@/modules/call/ui/components/call-active";
import CallEnded from "@/modules/call/ui/components/call-ended";
import CallLobby from "@/modules/call/ui/components/call-lobby";

type Props = { meetingName: string };

enum CallState {
  LOBBY = "lobby",
  CALL = "call",
  ENDED = "ended",
}

const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<CallState>(CallState.LOBBY);

  const handleJoinCall = async () => {
    if (!call) return;
    await call.join();
    setShow(CallState.CALL);
  };
  const handleLeaveCall = async () => {
    if (!call) return;
    await call.endCall();
    setShow(CallState.ENDED);
  };

  return (
    <StreamTheme className="h-full">
      {show === CallState.LOBBY && <CallLobby onJoinCall={handleJoinCall} />}
      {show === CallState.CALL && (
        <CallActive meetingName={meetingName} onLeaveCall={handleLeaveCall} />
      )}
      {show === CallState.ENDED && <CallEnded />}
    </StreamTheme>
  );
};

export default CallUI;
