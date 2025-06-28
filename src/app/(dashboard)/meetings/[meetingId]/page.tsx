type Props = { params: Promise<{ meetingId: string }> };

export default async function MeetingIDPage({ params }: Props) {
  const { meetingId } = await params;
  console.log("🚀 ~ MeetingIDPage ~ meetingId:", meetingId);
  return <div>page</div>;
}
