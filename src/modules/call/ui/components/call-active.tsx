"use client";

import Image from "next/image";
import Link from "next/link";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";

type Props = {
  meetingName: string;
  onLeaveCall: () => void;
};

const CallActive = ({ meetingName, onLeaveCall }: Props) => {
  return (
    <div className="flex h-full flex-col justify-between p-4 text-white">
      <div className="flex items-center gap-4 rounded-full bg-[#101213] p-4">
        <Link
          href={"/"}
          className="flex items-center justify-center rounded-full bg-white/10 p-1"
        >
          <Image src={"/assets/logo.svg"} width={32} height={32} alt="logo" />
        </Link>
        <h4 className="text-base">{meetingName}</h4>
      </div>
      <SpeakerLayout />
      <div className="rounded-full bg-[#101213] px-4">
        <CallControls onLeave={onLeaveCall} />
      </div>
    </div>
  );
};

export default CallActive;
