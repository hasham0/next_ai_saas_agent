import Link from "next/link";
import { Button } from "@/components/ui/button";

import "@stream-io/video-react-sdk/dist/css/styles.css";

const CallEnded = () => {
  return (
    <div className="from-sidebar-accent to-sidebar flex h-full flex-col items-center justify-center bg-radial">
      <div className="flex flex-1 items-center justify-center px-8 py-4">
        <div className="bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Call has ended</h6>
            <p className="text-sm">Summary will appear in a few minutes</p>
          </div>
          <Button asChild>
            <Link href={"/meetings"}>Back to Meetings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallEnded;
