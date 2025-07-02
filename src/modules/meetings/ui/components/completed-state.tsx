import Link from "next/link";
import {
  BookOpenTextIcon,
  ClockFadingIcon,
  FileTextIcon,
  FileVideoIcon,
  SparkleIcon,
} from "lucide-react";
import { format } from "date-fns";
import Markdown from "react-markdown";
import { GeneratedAvatar } from "@/components/shared/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDuration } from "@/lib/utils";
import { MeetingGetOne } from "@/modules/meetings/types";

type Props = { data: MeetingGetOne };

const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Tabs defaultValue="summary">
        <div className="rounded-lg border bg-white px-3">
          <ScrollArea>
            <TabsList className="bg-background h-13 justify-start rounded-none p-0">
              <TabsTrigger
                value="summary"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
              >
                <BookOpenTextIcon />
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
              >
                <FileTextIcon />
                Transcript
              </TabsTrigger>
              <TabsTrigger
                value="recording"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
              >
                <FileVideoIcon />
                Recording
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="text-muted-foreground bg-background data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground hover:text-accent-foreground h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none"
              >
                <SparkleIcon />
                Ask AI
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <TabsContent value="recording" className="p-3">
            <div className="rounded-lg border bg-white">
              <video
                src={data.recordingUrl!}
                className="w-full rounded-lg"
                controls
              />
            </div>
          </TabsContent>
          <TabsContent value="summary" className="p-3">
            <div className="rounded-lg border bg-white">
              <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
                <h2 className="text-2xl font-medium capitalize">{data.name}</h2>
                <div className="flex items-center gap-x-2">
                  <Link
                    href={`/agents/${data.agent.id}`}
                    className="flex items-center gap-x-2 capitalize underline underline-offset-4"
                  >
                    <GeneratedAvatar
                      variant="botttsNeutral"
                      seed={data.agent.name}
                      className="size-5"
                    />
                    {data.agent.name}
                  </Link>
                  <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <SparkleIcon className="size-4" />
                  <p>General Summary</p>
                </div>
                <Badge
                  variant="outline"
                  className="flex items-center gap-x-2 [&>svg]:size-4"
                >
                  <ClockFadingIcon className="text-blue-700" />
                  {data.duration
                    ? formatDuration(data.duration)
                    : "No duration"}
                </Badge>
              </div>
              <div className="">
                <Markdown
                  components={{
                    h1: (props) => (
                      <h1
                        className="mb-6 pl-2 text-2xl font-medium"
                        {...props}
                      />
                    ),
                    h2: (props) => (
                      <h2
                        className="mb-6 pl-2 text-xl font-medium"
                        {...props}
                      />
                    ),
                    h3: (props) => (
                      <h3
                        className="mb-6 pl-2 text-lg font-medium"
                        {...props}
                      />
                    ),
                    h4: (props) => (
                      <h4
                        className="mb-6 pl-2 text-base font-medium"
                        {...props}
                      />
                    ),
                    p: (props) => (
                      <p className="mb-6 pl-2 leading-relaxed" {...props} />
                    ),
                    ul: (props) => (
                      <ul
                        className="mb-6 list-inside list-disc pl-6"
                        {...props}
                      />
                    ),
                    ol: (props) => (
                      <ol
                        className="mb-6 list-inside list-decimal pl-6"
                        {...props}
                      />
                    ),
                    li: (props) => (
                      <li className="mb-2 list-inside" {...props} />
                    ),
                    strong: (props) => (
                      <strong className="font-semibold" {...props} />
                    ),
                    code: (props) => (
                      <code
                        className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
                        {...props}
                      />
                    ),
                    blockquote: (props) => (
                      <blockquote
                        className="border-primary mt-6 border-l-2 pl-6 italic"
                        {...props}
                      />
                    ),
                  }}
                >
                  {data.summary}
                </Markdown>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CompletedState;
