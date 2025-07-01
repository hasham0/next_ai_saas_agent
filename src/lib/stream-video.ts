import "server-only";

import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY as string;
const secret = process.env.STREAM_VIDEO_SECRET_KEY as string;

if (!apiKey || !secret) {
  throw new Error(
    "Missing required Stream Video environment variables: NEXT_PUBLIC_STREAM_VIDEO_API_KEY and STREAM_VIDEO_SECRET_KEY"
  );
}
let streamVideo: StreamClient;

try {
  streamVideo = new StreamClient(apiKey, secret);
} catch (error) {
  throw new Error(
    `Failed to initialize Stream Video client: ${error instanceof Error ? error.message : "Unknown error"}`
  );
}

export default streamVideo;
